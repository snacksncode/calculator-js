class Calculator {
  constructor() {
    this.current = 0;
    this.entered = 0;
    this.answer = 0;
    this.decimal = false;
    this.operator = '';
    window.addEventListener('keyup', this.handleKeyboard.bind(this));
    this.buttons = document.querySelectorAll('button');
    this.output = document.querySelector('.current');
    this.firstEntered = document.querySelector('.f-entered');
    this.lastEntered = document.querySelector('.l-entered');
    this.operatorEntered = document.querySelector('.operator');
    this.options = [
			['equals', this.processEquals.bind(this)],
			['clear', this.processClear.bind(this)],
			['inv', this.processInv.bind(this)],
			['dot', this.processDot.bind(this)],
      ['pi', this.processPi.bind(this)],
      ['sqrt', this.processSqrt.bind(this)]
		];
    for ( let i = 0; i < this.buttons.length; i++ ) {
      let button = this.buttons[i]
      let action = button.getAttribute('data-key')
      let calc = this;
      button.addEventListener('click', () => {
        let _this = this;
        calc.processAction(action);
      })
    }
  }
  processAction(a) {
    for ( let i = 0, n = this.options.length; i < n; i++ ) {
      let option = this.options[i];
      if ( a === option[0] ) {
        option[1]();
        return;
      }
    }
    if(a === '+' || a === '-' || a === '/' || a === '*') {
			this.processFunction(a);
			return;
		} else {
			this.processNumber(a);
			return;
		}
  }
  processEquals() {
    if ( !!this.answer ) { return }
    if ( !!this.operator ) {
      this.displayNumber(this.current, this.lastEntered);
      if ( this.entered < 0 && this.current < 0 && this.operator === "-") {
        let answer = this.entered - this.current;
        this.displayNumber(answer, this.output);
      } else {
        this.answer = eval(this.entered + this.operator + this.current);
        this.displayNumber(this.answer, this.output);
      }
			this.current = this.answer;
    }
  }
  processClear() {
    this.current = 0;
    this.displayNumber(this.current, this.output);
    this.entered = 0;
    this.answer = 0;
    this.decimal = false;
    this.operator = '';
    this.lastEntered.textContent = '';
    this.firstEntered.textContent = '';
    this.operatorEntered.textContent = '';
  }
  processInv() {
    if ( this.current === Infinity ) { return }
    if ( this.current < 0 ) {
      this.current *= -1;
      this.displayNumber(this.current, this.output, 10);
    }
    else {
      this.current *= -1;
      this.displayNumber(this.current, this.output, 11);
    }
  }
  processPi() {
    if ( this.current === Infinity ) { return }
    else {
      this.current = Math.PI;
      this.displayNumber(this.current, this.output);
    }
  }
  processDot() {
    if ( this.decimal ) {
      return 
    }
    else {
      this.current += '.';
      this.displayNumber(this.current, this.output);
      this.decimal = true;
    }
  }
  processSqrt() {
    if ( this.current < 0 ) {
      this.current = undefined;
      this.displayNumber(this.current, this.output);
    } else {
      this.current = Math.sqrt(this.current);
      this.displayNumber(this.current, this.output);
    }
  }
  processFunction(a) {
    if ( !!this.entered && !!!this.answer ) { return }
    if ( this.current === Infinity || this.current === undefined || this.current === NaN ) { return }
    if ( this.answer ) {
      this.lastEntered.textContent = '';
    }
    this.decimal = false;
    this.answer = 0;
    this.entered = this.current;
    this.displayNumber(this.entered, this.firstEntered);
    if ( a === "*" ) {
      this.operator = a;
      this.displayNumber('×', this.operatorEntered);
    } else if ( a === "/" ) {
      this.operator = a;
      this.displayNumber('÷', this.operatorEntered);
    } else {
      this.operator = a;
      this.displayNumber(this.operator, this.operatorEntered);
    }
    this.current = 0;
    this.displayNumber(this.current, this.output);
  }
  processNumber(n) {
		if ( this.current === 0 ) {
      this.current = n;
    } else if ( this.current === Infinity ) {
      return
    } else {
      this.current += n;
    }
		this.displayNumber(this.current, this.output);
	}
  displayNumber(n, location, p = 10) {
		location.innerHTML = String(n).substring(0, p);
	}
  handleKeyboard(e) {
    let key = e.which || e.keyCode || 0;
    //console.log(key)
    switch(key) {
      case 13:
        this.processEquals();
        break;
      case 96:
      case 48:
        this.processAction('0');
        break;
      case 97:
      case 49:
        this.processAction('1');
        break;
      case 98:
      case 50:
        this.processAction('2');
        break;
      case 99:
      case 51:
        this.processAction('3');
        break;
      case 100:
      case 52:
        this.processAction('4');
        break;
      case 101:
      case 53:
        this.processAction('5');
        break;
      case 102:
      case 54:
        this.processAction('6');
        break;
      case 103:
      case 55:
        this.processAction('7');
        break;
      case 104:
      case 56:
        this.processAction('8');
        break;
      case 105:
      case 57:
        this.processAction('9');
        break;
      case 110:
      case 108:
        this.processDot();
        break;
      case 107:
      case 187:
        this.processAction('+');
        break;
      case 109:
      case 189:
        this.processAction('-');
        break;
      case 111:
        this.processAction('/');
        break;
      case 106:
        this.processAction('*');
        break;
      default:
        break;
    }
  }
}
calc = new Calculator();
