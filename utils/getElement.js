function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw new Error(
      `Check your ${selection} selector, no such element exists in the HTML`
    );
  }
}

export default getElement;
