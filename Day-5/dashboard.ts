document.addEventListener('DOMContentLoaded', () => {
  interface TransactionBase {
    transactionId: string;
    amount: number;
    timestamp: Date;
  }

  interface CardTransaction extends TransactionBase {
    cardNumber: string;
    expiryDate: string;
  }

  interface UPITransaction extends TransactionBase {
    upiId: string;
  }

  interface NetBankingTransaction extends TransactionBase {
    bankName: string;
    accountNumber: string;
  }

  type PaymentMethod = CardTransaction | UPITransaction | NetBankingTransaction;

  const paymentDetails: PaymentMethod[] = [];

  function processPayment(payment: PaymentMethod): void {
    paymentDetails.push(payment);
    console.log(paymentDetails);
    displayPaymentDetails();
  }

  function displayPaymentDetails(): void {
    const cardContainer = document.getElementById('cardDetails');
    const upiContainer = document.getElementById('upiDetails');
    const bankContainer = document.getElementById('netBankingDetails');

    const cardTemplate = document.getElementById('cardTemplate') as HTMLTemplateElement;
    const upiTemplate = document.getElementById('upiTemplate') as HTMLTemplateElement;
    const bankTemplate = document.getElementById('bankTemplate') as HTMLTemplateElement;

    console.log('Card Template:', cardTemplate);
    console.log('UPI Template:', upiTemplate);
    console.log('Bank Template:', bankTemplate);

    if (!cardTemplate || !upiTemplate || !bankTemplate) {
      console.error('One or more templates are missing in the DOM.');
      return;
    }

    // Clear existing content in containers
    if (cardContainer) cardContainer.innerHTML = '';
    if (upiContainer) upiContainer.innerHTML = '';
    if (bankContainer) bankContainer.innerHTML = '';

    paymentDetails.forEach((payment) => {
      if ('cardNumber' in payment) {
        const clone = cardTemplate.content.cloneNode(true) as HTMLElement;
        clone.querySelector('.transaction-id')!.textContent = payment.transactionId;
        clone.querySelector('.amount')!.textContent = payment.amount.toFixed(2);
        clone.querySelector('.card-number')!.textContent = payment.cardNumber.slice(-4);
        clone.querySelector('.expiry-date')!.textContent = payment.expiryDate;
        clone.querySelector('.timestamp')!.textContent = payment.timestamp.toLocaleString();
        cardContainer?.appendChild(clone);
      } else if ('upiId' in payment) {
        const clone = upiTemplate.content.cloneNode(true) as HTMLElement;
        clone.querySelector('.transaction-id')!.textContent = payment.transactionId;
        clone.querySelector('.amount')!.textContent = payment.amount.toFixed(2);
        clone.querySelector('.upi-id')!.textContent = payment.upiId;
        clone.querySelector('.timestamp')!.textContent = payment.timestamp.toLocaleString();
        upiContainer?.appendChild(clone);
      } else if ('bankName' in payment) {
        const clone = bankTemplate.content.cloneNode(true) as HTMLElement;
        clone.querySelector('.transaction-id')!.textContent = payment.transactionId;
        clone.querySelector('.amount')!.textContent = payment.amount.toFixed(2);
        clone.querySelector('.bank-name')!.textContent = payment.bankName;
        clone.querySelector('.account-number')!.textContent = payment.accountNumber.slice(-4);
        clone.querySelector('.timestamp')!.textContent = payment.timestamp.toLocaleString();
        bankContainer?.appendChild(clone);
      }
    });
  }

  document.getElementById('paymentForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const paymentMethod = (document.getElementById('paymentMethod') as HTMLSelectElement).value;
    const commonData: TransactionBase = {
      transactionId: `txn${Date.now()}`,
      amount: 0,
      timestamp: new Date(),
    };

    if (paymentMethod === 'Card') {
      const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
      const expiryDate = (document.getElementById('expiryDate') as HTMLInputElement).value;
      const amount = parseFloat((document.getElementById('amountCard') as HTMLInputElement).value);
      const cardTransaction: CardTransaction = { ...commonData, cardNumber, expiryDate, amount };
      processPayment(cardTransaction);
    } else if (paymentMethod === 'UPI') {
      const upiId = (document.getElementById('upiId') as HTMLInputElement).value;
      const amount = parseFloat((document.getElementById('amountUpi') as HTMLInputElement).value);
      const upiTransaction: UPITransaction = { ...commonData, upiId, amount };
      processPayment(upiTransaction);
    } else if (paymentMethod === 'NetBanking') {
      const bankName = (document.getElementById('bankName') as HTMLInputElement).value;
      const accountNumber = (document.getElementById('accountNumber') as HTMLInputElement).value;
      const amount = parseFloat((document.getElementById('amountBank') as HTMLInputElement).value);
      const netBankingTransaction: NetBankingTransaction = { ...commonData, bankName, accountNumber, amount };
      processPayment(netBankingTransaction);
    }

    // Clear form fields
    (document.getElementById('paymentForm') as HTMLFormElement).reset();
    document.querySelectorAll('.payment-fields, button[type="submit"]').forEach((el) => {
      el.classList.add('hidden');
    });
  });

  document.getElementById('paymentMethod')?.addEventListener('change', (event) => {
    const method = (event.target as HTMLSelectElement).value;

    document.querySelectorAll('.payment-fields, button[type="submit"]').forEach((el) => {
      el.classList.add('hidden');
    });

    if (method === 'Card') {
      document.getElementById('cardFields')?.classList.remove('hidden');
    } else if (method === 'UPI') {
      document.getElementById('upiFields')?.classList.remove('hidden');
    } else if (method === 'NetBanking') {
      document.getElementById('netBankingFields')?.classList.remove('hidden');
    }

    document.querySelector('button[type="submit"]')?.classList.remove('hidden');
  });

  document.querySelectorAll('.tab-button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const category = (event.target as HTMLElement).dataset.category;
      document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.add('hidden');
      });
      document.getElementById(`${category}Details`)?.classList.remove('hidden');
    });
  });
});