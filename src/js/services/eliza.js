angular.module('moodApp')
  .service('elizaService', ElizaService);

ElizaService.$inject = ['$window', 'ELIZADATA'];
function ElizaService($window, ELIZADATA) {

  const global = this;

  this.noRandom = true;
  this.capitalizeFirstLetter=true;
  this.debug = false;
  this.memSize = 20;
  this.version = '1.1 (original)';

  this.reset = reset;
  this.transform = transform;
  this.getFinal = getFinal;

  this._dataParsed = false;
  this._init = _init;
  this._sortKeywords = _sortKeywords;
  this._execRule = _execRule;
  this._postTransform = _postTransform;
  this._getRuleIndexByKey = _getRuleIndexByKey;
  this._memSave = _memSave;
  this._memGet = _memGet;
  this.getInitial = getInitial;

  function reset() {
    global.quit = false;
    global.mem = [];
    global.lastchoice = [];
    for (let k=0; k < ELIZADATA.elizaKeywords.length; k++) {
      global.lastchoice[k]=[];
      const rules = ELIZADATA.elizaKeywords[k][2];
      for (let i=0; i<rules.length; i++) global.lastchoice[k][i] =- 1;
    }
  }

  function _init() {
    // parse data and convert it from canonical form to internal use
    // prodoce synonym list
    const synPatterns = {};
    if ((ELIZADATA.elizaSynons) && (typeof ELIZADATA.elizaSynons === 'object')) {
      for (const i in ELIZADATA.elizaSynons) synPatterns[i]='('+i+'|'+ELIZADATA.elizaSynons[i].join('|')+')';
    }
    // check for keywords or install empty structure to prevent any errors
    if ((!ELIZADATA.elizaKeywords) || (typeof ELIZADATA.elizaKeywords.length === 'undefined')) {
      ELIZADATA.elizaKeywords = [['###',0,[['###',[]]]]];
    }
    // 1st convert rules to regexps
    // expand synonyms and insert asterisk expressions for backtracking
    const sre = /@(\S+)/;
    const are = /(\S)\s*\*\s*(\S)/;
    const are1 = /^\s*\*\s*(\S)/;
    const are2 = /(\S)\s*\*\s*$/;
    const are3 = /^\s*\*\s*$/;
    const wsre = /\s+/g;
    for (let k=0; k<ELIZADATA.elizaKeywords.length; k++) {
      const rules = ELIZADATA.elizaKeywords[k][2];
      ELIZADATA.elizaKeywords[k][3]=k; // save original index for sorting
      for (let i=0; i<rules.length; i++) {
        const r = rules[i];
        // check mem flag and store it as decomp's element 2
        if (r[0].charAt(0) === '$') {
          let ofs = 1;
          while (r[0].charAt[ofs] === ' ') ofs++;
          r[0] = r[0].substring(ofs);
          r[2] = true;
        } else {
          r[2] = false;
        }
        // expand synonyms (v.1.1: work around lambda function)
        let m = sre.exec(r[0]);
        while (m) {
          const sp = (synPatterns[m[1]])? synPatterns[m[1]]:m[1];
          r[0] = r[0].substring(0,m.index)+sp+r[0].substring(m.index+m[0].length);
          m = sre.exec(r[0]);
        }
        // expand asterisk expressions (v.1.1: work around lambda function)
        if (are3.test(r[0])) {
          r[0] = '\\s*(.*)\\s*';
        } else {
          m = are.exec(r[0]);
          if (m) {
            let lp = '';
            let rp = r[0];
            while (m) {
              lp += rp.substring(0,m.index+1);
              if (m[1] !== ')') lp += '\\b';
              lp += '\\s*(.*)\\s*';
              if ((m[2] !== '(') && (m[2] !== '\\')) lp += '\\b';
              lp += m[2];
              rp = rp.substring(m.index+m[0].length);
              m = are.exec(rp);
            }
            r[0] = lp+rp;
          }
          m = are1.exec(r[0]);
          if (m) {
            let lp = '\\s*(.*)\\s*';
            if ((m[1] !== ')') && (m[1] !== '\\')) lp += '\\b';
            r[0] = lp + r[0].substring(m.index-1 + m[0].length);
          }
          m = are2.exec(r[0]);
          if (m) {
            let lp = r[0].substring(0,m.index+1);
            if (m[1] !== '(') lp += '\\b';
            r[0] = lp+'\\s*(.*)\\s*';
          }
        }
        // expand white space
        r[0] = r[0].replace(wsre, '\\s+');
        wsre.lastIndex=0;
      }
    }
    // now sort keywords by rank (highest first)
    ELIZADATA.elizaKeywords.sort(this._sortKeywords);
    // and compose regexps and refs for pres and posts
    global.pres = {};
    global.posts = {};
    if ((ELIZADATA.elizaPres) && (ELIZADATA.elizaPres.length)) {
      const a = new Array();
      for (let i = 0; i < ELIZADATA.elizaPres.length; i+=2) {
        a.push(ELIZADATA.elizaPres[i]);
        global.pres[ELIZADATA.elizaPres[i]] = ELIZADATA.elizaPres[i+1];
      }
      global.preExp = new RegExp('\\b('+a.join('|')+')\\b');
    } else {
      // default (should not match)
      global.preExp = /####/;
      global.pres['####'] = '####';
    }
    if ((ELIZADATA.elizaPosts) && (ELIZADATA.elizaPosts.length)) {
      const a = new Array();
      for (let i=0; i<ELIZADATA.elizaPosts.length; i+=2) {
        a.push(ELIZADATA.elizaPosts[i]);
        global.posts[ELIZADATA.elizaPosts[i]] = ELIZADATA.elizaPosts[i+1];
      }
      global.postExp = new RegExp('\\b('+a.join('|')+')\\b');
    } else {
      // default (should not match)
      global.postExp = /####/;
      global.posts['####']='####';
    }
    // check for elizaQuits and install default if missing
    if ((!ELIZADATA.elizaQuits) || (typeof ELIZADATA.elizaQuits.length === 'undefined')) {
      ELIZADATA.elizaQuits = ['goodbye'];
    }
    // done
    global._dataParsed=true;
  }

  function _sortKeywords(a,b) {
    // sort by rank
    if (a[1]>b[1]) return -1;
    else if (a[1]<b[1]) return 1;
    // or original index
    else if (a[3]>b[3]) return 1;
    else if (a[3]<b[3]) return -1;
    else return 0;
  }

  function transform(text) {
    let rpl = '';
    global.quit = false;
    // unify text string
    text=text.toLowerCase();
    text=text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, ' ');
    text=text.replace(/\s+-+\s+/g, '.');
    text=text.replace(/\s*[,\.\?!;]+\s*/g, '.');
    text=text.replace(/\s*\bbut\b\s*/g, '.');
    text=text.replace(/\s{2,}/g, ' ');
    // split text in part sentences and loop through them
    const parts = text.split('.');
    for (let i=0; i<parts.length; i++) {
      let part = parts[i];
      if (part !== '') {
        // check for quit expression
        for (let q=0; q<ELIZADATA.elizaQuits.length; q++) {
          if (ELIZADATA.elizaQuits[q] === part) {
            global.quit=true;
            return this.getFinal();
          }
        }
        // preprocess (v.1.1: work around lambda function)
        let m=global.preExp.exec(part);
        if (m) {
          let lp = '';
          let rp = part;
          while (m) {
            lp += rp.substring(0,m.index)+this.pres[m[1]];
            rp = rp.substring(m.index+m[0].length);
            m = global.preExp.exec(rp);
          }
          part = lp+rp;
        }
        global.sentence=part;
        // loop trough keywords
        for (let k=0; k<ELIZADATA.elizaKeywords.length; k++) {
          if (part.search(new RegExp('\\b'+ELIZADATA.elizaKeywords[k][0]+'\\b', 'i'))>=0) {
            rpl = global._execRule(k);
          }
          if (rpl !== '') return rpl;
        }
      }
    }
    // nothing matched try mem
    rpl = global._memGet();
    // if nothing in mem, so try xnone
    if (rpl === '') {
      global.sentence = ' ';
      const k = global._getRuleIndexByKey('xnone');
      if (k>=0) rpl = global._execRule(k);
    }
    // return reply or default string
    return (rpl !== '')? rpl : 'I am at a loss for words.';
  }

  function _execRule(k) {
    const rule = ELIZADATA.elizaKeywords[k];
    const decomps = rule[2];
    const paramre = /\(([0-9]+)\)/;
    for (let i=0; i<decomps.length; i++) {
      const m = global.sentence.match(decomps[i][0]);
      if (m !== null) {
        const reasmbs = decomps[i][1];
        const memflag = decomps[i][2];
        let ri = (global.noRandom)? 0 : Math.floor(Math.random()*reasmbs.length);
        if (((global.noRandom) && (global.lastchoice[k][i]>ri)) || (global.lastchoice[k][i] === ri)) {
          ri = ++global.lastchoice[k][i];
          if (ri >= reasmbs.length) {
            ri = 0;
            global.lastchoice[k][i] = -1;
          }
        } else {
          global.lastchoice[k][i] = ri;
        }
        let rpl = reasmbs[ri];
        if (global.debug) alert('match:\nkey: ' + ELIZADATA.elizaKeywords[k][0]+
          '\nrank: '+ ELIZADATA.elizaKeywords[k][1]+
          '\ndecomp: '+ decomps[i][0]+
          '\nreasmb: '+ rpl+
          '\nmemflag: '+ memflag);
        if (rpl.search('^goto ', 'i') === 0) {
          const ki = global._getRuleIndexByKey(rpl.substring(5));
          if (ki >= 0) return global._execRule(ki);
        }
        // substitute positional params (v.1.1: work around lambda function)
        let m1 = paramre.exec(rpl);
        if (m1) {
          let lp = '';
          let rp = rpl;
          while (m1) {
            let param = m[parseInt(m1[1])];
            // postprocess param
            let m2 = global.postExp.exec(param);
            if (m2) {
              let lp2 = '';
              let rp2 = param;
              while (m2) {
                lp2 += rp2.substring(0,m2.index)+global.posts[m2[1]];
                rp2 = rp2.substring(m2.index+m2[0].length);
                m2 = global.postExp.exec(rp2);
              }
              param = lp2+rp2;
            }
            lp += rp.substring(0,m1.index)+param;
            rp = rp.substring(m1.index+m1[0].length);
            m1 = paramre.exec(rp);
          }
          rpl = lp+rp;
        }
        rpl = global._postTransform(rpl);
        if (memflag) global._memSave(rpl);
        else return rpl;
      }
    }
    return '';
  }

  function _postTransform(s) {
    // final cleanings
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s+\./g, '.');
    if ((ELIZADATA.elizaPostTransforms) && (ELIZADATA.elizaPostTransforms.length)) {
      for (let i=0; i<ELIZADATA.elizaPostTransforms.length; i+=2) {
        s = s.replace(ELIZADATA.elizaPostTransforms[i], ELIZADATA.elizaPostTransforms[i+1]);
        ELIZADATA.elizaPostTransforms[i].lastIndex=0;
      }
    }
    // capitalize first char (v.1.1: work around lambda function)
    if (global.capitalizeFirstLetter) {
      const re=/^([a-z])/;
      const m=re.exec(s);
      if (m) s=m[0].toUpperCase()+s.substring(1);
    }
    return s;
  }

  function _getRuleIndexByKey(key) {
    for (let k=0; k<ELIZADATA.elizaKeywords.length; k++) {
      if (ELIZADATA.elizaKeywords[k][0] === key) return k;
    }
    return -1;
  }

  function _memSave(t) {
    global.mem.push(t);
    if (global.mem.length>global.memSize) global.mem.shift();
  }

  function _memGet() {
    if (global.mem.length) {
      if (global.noRandom) return global.mem.shift();
      else {
        const n = Math.floor(Math.random()*global.mem.length);
        const rpl = global.mem[n];
        for (let i=n+1; i<global.mem.length; i++) global.mem[i-1] = global.mem[i];
        global.mem.length--;
        return rpl;
      }
    } else {
      return '';
    }
  }

  function getFinal() {
    return ELIZADATA.elizaFinals[Math.floor(Math.random()*ELIZADATA.elizaFinals.length)];
  }

  function getInitial() {
    return ELIZADATA.elizaInitials[Math.floor(Math.random()*ELIZADATA.elizaInitials.length)];
  }

  if (!global._dataParsed) global._init();
  global.reset();
}
