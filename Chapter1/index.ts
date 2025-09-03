function deriveFinalPrice(inputPrice: number) {
  const finalPrice = inputPrice + inputPrice * 0.19;
  const outputEl = document.getElementById('final-price')!;
  outputEl.textContent = 'Final Price: ' + finalPrice + ' €';
}

const formEl = document.querySelector('form');

formEl?.addEventListener('submit', function (event: SubmitEvent) {
  event.preventDefault();
  const fd = new FormData(event.target as HTMLFormElement);
  const inputPrice = fd.get('price');
  deriveFinalPrice(Number(inputPrice));
});