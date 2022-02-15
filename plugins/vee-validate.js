import Vue from 'vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules.umd';
import { messages } from 'vee-validate/dist/locale/pt_BR.json';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  });
});

extend('cpf', {
  validate(value) {
    const cleanCPF = value.replace(/[^\d]+/g, '');
    const firstNineDigits = cleanCPF.substring(0, 9);
    const checker = cleanCPF.substring(9, 11);
    const checkers = {
      calcChecker1(firstNineDigits) {
        let sum = null

        for (let j = 0; j < 9; ++j) {
          sum += firstNineDigits.toString().charAt(j) * (10 - j)
        }

        const lastSumChecker1 = sum % 11
        const checker1 = (lastSumChecker1 < 2) ? 0 : 11 - lastSumChecker1

        return checker1
      },
      calcChecker2(cpfWithChecker1) {
        let sum = null

        for (let k = 0; k < 10; ++k) {
          sum += cpfWithChecker1.toString().charAt(k) * (11 - k)
        }
        const lastSumChecker2 = sum % 11
        const checker2 = (lastSumChecker2 < 2) ? 0 : 11 - lastSumChecker2

        return checker2
      }
    }

    for (let i = 0; i < 10; i++) {
      if (firstNineDigits + checker === Array(12).join(i)) {
        return false
      }
    }

    const checker1 = checkers.calcChecker1(firstNineDigits)
    const checker2 = checkers.calcChecker2(`${firstNineDigits}${checker1}`)

    return checker.toString() === checker1.toString() + checker2.toString()
  },
  message: 'O CPF informado é inválido.'
})
