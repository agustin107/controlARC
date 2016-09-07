(() => {
  $('#searchProduct').click((ev) => {
    const productToSearch = $('input[name="productToSearch"]').val();
    if (productToSearch) {
      location.href=`/product?search=${productToSearch}`;
    }
  });
})();
