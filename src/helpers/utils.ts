export const generateInterest = (principal, interestRate, duration, interestType = 'simple') => {
  switch(interestType) {
    case 'simple':
      const simpleInterest =  Number(principal) * (Number(interestRate) / 100) * (Number(duration) / 360);
      return Number(simpleInterest.toFixed(2));
    case 'compound':
      const amountAfterInterest = Number(principal) * Math.pow((1 + (Number(interestRate) / (36000))), (duration))
      const compoundInterest = amountAfterInterest - Number(principal);
      return Number(compoundInterest.toFixed(2));
  }
}