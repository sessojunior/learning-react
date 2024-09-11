import { useState, useRef } from 'react'

const pizzaSizes = [
  { id: 'P', name: 'Pequena', description: '4 fatias', size: '35 cm', maxQtyFlavors: 1, available: true },
  { id: 'M', name: 'Média', description: '4 fatias', size: '30 cm', maxQtyFlavors: 2, available: true },
  { id: 'G', name: 'Grande', description: '8 fatias', size: '35 cm', maxQtyFlavors: 3, available: true },
  { id: 'GG', name: 'Gigante', description: '8 fatias', size: '40 cm', maxQtyFlavors: 4, available: false }
]

const pizzaFlavors = [
  { id: 'MARGUERITA', name: 'Marguerita', ingredients: ['TOMATE', 'MUSSARELA', 'MANJERICAO'], prices: { P: 24, M: 31, G: 45, GG: 69 }, available: true },
  { id: 'PEPERONI', name: 'Pepperoni', ingredients: ['PEPPERONI', 'MUSSARELA'], prices: { P: 25, M: 32, G: 46, GG: 70 }, available: true },
  { id: 'FRANGO_CATUPIRY', name: 'Frango com Catupiry', ingredients: ['FRANGO', 'CATUPIRY', 'CEBOLA', 'TOMATE'], prices: { P: 26, M: 33, G: 47, GG: 71 }, available: true }
]

const pizzaCrustTypes = [
  { id: 'NORMAL', name: 'Normal', price: 0, available: true },
  { id: 'CHEDDAR', name: 'Com Cheddar', price: 5, available: true },
  { id: 'CATUPIRY', name: 'Com Catupiry', price: 5, available: true }
]

const pizzaDoughTypes = [
  { id: 'TRADICIONAL', name: 'Tradicional', price: 0, available: true },
  { id: 'SEM_LACTOSE', name: 'Sem lactose', price: 5, available: true }
]

const pizzaIngredients = [
  { id: 'TOMATE', name: 'Tomate' },
  { id: 'MUSSARELA', name: 'Mussarela' },
  { id: 'CEBOLA', name: 'Cebola' },
  { id: 'MANJERICAO', name: 'Manjericão' },
  { id: 'PEPPERONI', name: 'Pepperoni' },
  { id: 'CATUPIRY', name: 'Catupiry' },
  { id: 'FRANGO', name: 'Frango' },
]

const pizzaExtraIngredients = [
  { id: 'AZEITONA', name: 'Azeitona', price: 3, available: true },
  { id: 'MILHO', name: 'Milho', price: 3, available: false },
  { id: 'BACON', name: 'Bacon', price: 5, available: true }
]

const drinks = [
  { id: 'SODA_LIMONADA', name: 'Soda Limonada', price: 6, stock: 5 },
  { id: 'COCACOLA', name: 'Coca Cola', price: 7, stock: 4 },
  { id: 'GUARANA', name: 'Guarana', price: 5, stock: 8 },
  { id: 'AGUA', name: 'Agua', price: 2, stock: 9 },
]

export default function App() {
  const [selectedSize, setSelectedSize] = useState(pizzaSizes[1]) // Tamanho da pizza
  const [selectedCrust, setSelectedCrust] = useState(pizzaCrustTypes[0]) // Borda da pizza
  const [selectedDough, setSelectedDough] = useState(pizzaDoughTypes[0]) // Massa da pizza
  const [selectFlavorQty, setSelectFlavorQty] = useState(1) // Quantidade de sabores
  const [selectedFlavors, setSelectedFlavors] = useState([]) // Sabores da pizza
  const [observations, setObservations] = useState('') // Observações
  const [cart, setCart] = useState([]) // Carrinho de compras

  // Tamanho da pizza
  const handleSize = (size) => {
    setSelectedSize(size)
    setSelectFlavorQty(1)
    setSelectedFlavors([])
  }

  // Borda da pizza
  const handleCrust = (crust) => setSelectedCrust(crust)

  // Massa da pizza
  const handleDough = (dough) => setSelectedDough(dough)

  // Quantidade de sabores
  const handleFlavorQty = (flavorQty) => setSelectFlavorQty(flavorQty)

  // Sabores da pizza
  const handleFlavor = (index, flavorId) => {
    if (flavorId === "") {
      setSelectedFlavors(prevFlavors => {
        const newFlavors = [...prevFlavors];
        newFlavors[index] = undefined; // Remove the flavor selection
        return newFlavors;
      });
      return;
    }

    const flavor = pizzaFlavors.find(f => f.id === flavorId);
    if (flavor) {
      setSelectedFlavors(prevFlavors => {
        const newFlavors = [...prevFlavors];
        newFlavors[index] = {
          id: flavor.id,
          name: flavor.name,
          price: flavor.prices[selectedSize.id],
          ingredients: flavor.ingredients,
          extraIngredients: [],
        };
        return newFlavors;
      });
    }
  };

  // Ingredientes do sabor da pizza
  const handleFlavorIngredients = (index, ingredient) => {
    setSelectedFlavors(prevFlavors => {
      const pizzaIngredient = pizzaIngredients.find(i => i.id === ingredient).id;
      const existsIngredientSelectedFlavor = prevFlavors[index].ingredients.find(i => i === pizzaIngredient);

      let ingredientsSelectedFlavor = [];

      if (existsIngredientSelectedFlavor) {
        // Filtra os ingredientes, removendo o selecionado
        ingredientsSelectedFlavor = prevFlavors[index].ingredients.filter(i => i !== pizzaIngredient);

        // Verifica se está tentando remover todos os ingredientes
        if (ingredientsSelectedFlavor.length === 0) {
          alert("A pizza deve ter pelo menos um ingrediente.");
          return prevFlavors; // Retorna o estado anterior sem alterações
        }
      } else {
        // Adiciona o ingrediente se ele ainda não estiver na lista
        ingredientsSelectedFlavor = [...prevFlavors[index].ingredients, pizzaIngredient];
      }

      // Cria o novo array de sabores com o ingrediente atualizado
      const newFlavors = [...prevFlavors];
      newFlavors[index] = {
        ...newFlavors[index],
        ingredients: ingredientsSelectedFlavor
      };

      console.log("newFlavors", newFlavors);

      return newFlavors;
    });
  };

  // Ingredientes extras do sabor da pizza
  const handleFlavorExtraIngredients = (index, extraIngredient) => {
    setSelectedFlavors((prevFlavors) => {
      const newFlavors = [...prevFlavors];

      // Encontra o ingrediente extra com base no ID
      const ingredient = pizzaExtraIngredients.find((i) => i.id === extraIngredient);

      // Verifica se o ingrediente já existe nos ingredientes extras do sabor
      const existsIngredientSelectedFlavor = newFlavors[index].extraIngredients.find((i) => i.id === ingredient.id);

      if (existsIngredientSelectedFlavor) {
        // Remove o ingrediente se já estiver selecionado
        newFlavors[index].extraIngredients = newFlavors[index].extraIngredients.filter((i) => i.id !== ingredient.id);
      } else {
        // Adiciona o ingrediente com id e price se não estiver presente
        newFlavors[index].extraIngredients.push({ id: ingredient.id, price: ingredient.price });
      }

      return newFlavors;
    });
  };

  // Observações
  const handleObservations = (observations) => {
    setObservations(observations);
  }




  // Calcular o preço da pizza
  const calculatePizzaPrice = (flavors, crust, dough) => {
    // Inicializa o preço com o preço da massa e da borda
    let price = crust.price + dough.price;
    
    // Verifica o preço do sabor mais caro
    const maxFlavorPrice = Math.max(...flavors.map(flavor => flavor.price));

    // Adiciona o preço do sabor mais caro
    price += maxFlavorPrice;

    // Adiciona o total dos ingredientes extras de todos os sabores
    flavors.forEach((flavor) => {
      flavor.extraIngredients.forEach((extra) => {
        price += extra.price;
      });
    });

    return price;
  };


  // Adicionar ao carrinho
  const handleAddCart = ({ product, type }) => {
    if (type === "pizza") { // Pizza
      if (selectedFlavors.length < selectFlavorQty) {
        alert("Você deve selecionar todos os sabores.");
        return;
      }

      const pizzaPrice = calculatePizzaPrice(selectedFlavors, selectedCrust, selectedDough)
      const pizza = {
        size: selectedSize,
        qtyFlavors: selectFlavorQty,
        flavors: selectedFlavors,
        crust: selectedCrust,
        dought: selectedDough,
        observations: observations,
        price: pizzaPrice,
      }

      setCart(prevCart => [...prevCart, { id: parseInt(Math.random() * 10 ** 8), qty: 1, price: pizzaPrice, type: "pizza", data: pizza }])
      resetSelections();

      console.log("pizza", pizza)
    } else { // Outros produtos
      const item = {
        id: product.id,
        price: product.price,
        name: product.name
      }
      // setCart(prevCart => [...prevCart, { id: parseInt(Math.random() * 10 ** 8), qty: 1, type: type, data: item }])

      setCart(prevCart => {
        const existingItem = prevCart.find(cartItem => cartItem.data.id === product.id);
        if (existingItem) {
          return prevCart.map(cartItem =>
            cartItem.data.id === product.id && cartItem.type === type
              ? { ...cartItem, qty: cartItem.qty + 1 }
              : cartItem
          );
        }
        return [...prevCart, { id: parseInt(Math.random() * 10 ** 8), qty: 1, price: product.price, type: type, data: item }];
      });

    }
    console.log("cart", cart)
  }

  // Limpa as informações da pizza
  const resetSelections = () => {
    setSelectedSize(pizzaSizes[1]) // Tamanho da pizza
    setSelectedCrust(pizzaCrustTypes[0]) // Borda da pizza
    setSelectedDough(pizzaDoughTypes[0]) // Massa da pizza
    setSelectFlavorQty(1) // Quantidade de sabores
    setSelectedFlavors([]) // Sabores da pizza
    setObservations('') // Observações
  };

  // Remover item do carrinho
  const handleRemoveCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    console.log("Item removido, novo carrinho:", cart);
  }

  // Aumentar a quantidade de um item no carrinho
  const handleIncreaseItemCart = (productId) => {
    setCart(prevCart => prevCart.map(cartItem =>
      cartItem.id === productId
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    ));
  }

  // Diminuir a quantidade de um item no carrinho
  const handleDecreaseItemCart = (productId) => {
    setCart(prevCart => prevCart.map(cartItem =>
      cartItem.id === productId
        ? { ...cartItem, qty: Math.max(cartItem.qty - 1, 1) }
        : cartItem
    ));
  }

  // Calcular o total a pagar
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.data.price * item.qty, 0);
  };

  return (
    <div className="flex gap-8 justify-between p-8">
      <div className="flex flex-col w-1/2">
        <div>
          <h2 className="text-2xl font-bold mb-4">Monte sua pizza</h2>

          {/* Tamanho da pizza */}
          <h3 className="text-xl font-semibold mb-4">Escolha o tamanho da pizza</h3>
          {pizzaSizes.filter(size => size.available).map(size => (
            <div key={size.id} className="mb-2">
              <input type="radio" id={size.id} name="pizza-size" checked={selectedSize.id === size.id} onChange={() => handleSize(size)} className="mr-2" />
              <label htmlFor={size.id} className="text-md">{size.name} - {size.description} - {size.size}</label>
            </div>
          ))}

          {/* Se selecionou o tamanho da pizza */}
          {selectedSize && (
            <>
              {/* Borda da pizza */}
              <h3 className="text-xl font-semibold mt-6 mb-4">Escolha a borda da pizza</h3>
              {pizzaCrustTypes.filter(crust => crust.available).map(crust => (
                <div key={crust.id} className="mb-2">
                  <input type="radio" id={crust.id} name="pizza-crust" onChange={() => handleCrust(crust)} checked={selectedCrust.id === crust.id} className="mr-2" />
                  <label htmlFor={crust.id} className="text-md">{crust.name} {crust.price > 0 && `(+R$ ${crust.price})`}</label>
                </div>
              ))}

              {/* Massa da pizza */}
              <h3 className="text-xl font-semibold mt-6 mb-4">Escolha a massa da pizza</h3>
              {pizzaDoughTypes.filter(dough => dough.available).map(dough => (
                <div key={dough.id} className="mb-2">
                  <input type="radio" id={dough.id} name="pizza-dough" onChange={() => handleDough(dough)} checked={selectedDough.id === dough.id} className="mr-2" />
                  <label htmlFor={dough.id} className="text-md">{dough.name} {dough.price > 0 && `(+R$ ${dough.price})`}</label>
                </div>
              ))}

              {/* Quantidade de sabores */}
              <h3 className="text-xl font-semibold mt-6 mb-4">Escolha a quantidade de sabores</h3>
              <select onChange={(e) => handleFlavorQty(e.target.value)} value={selectFlavorQty} className="w-full border border-gray-300 p-2 rounded">
                {Array.from({ length: selectedSize.maxQtyFlavors }, (_, i) => i + 1).map(qty => (
                  <option key={qty} value={qty}>{qty} sabor{qty > 1 ? 'es' : ''}</option>
                ))}
              </select>
              
              {/* Sabores da pizza */}
              {Array.from({ length: selectFlavorQty }, (_, i) => i).map((index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mt-6 mb-4">Escolha o {index + 1}º sabor</h3>
                  <select onChange={(e) => handleFlavor(index, e.target.value)} value={selectedFlavors[index]?.id || ""} className="w-full border border-gray-300 p-2 rounded">
                    <option value="">Selecione um sabor</option>
                    {pizzaFlavors.filter(flavor => flavor.available).map(flavor => (
                      <option key={flavor.id} value={flavor.id}>
                        {flavor.name} - R$ {flavor.prices[selectedSize.id]}
                      </option>
                    ))}
                  </select>
                  {selectedFlavors[index] && (
                    <>
                      {/* Ingredientes do sabor */}
                      <h4 className="text-md font-semibold mt-6 mb-4">Ingredientes do {index + 1}º sabor: <span className="font-normal">{selectedFlavors[index].name}</span></h4>
                      <ul>
                        {pizzaFlavors.map((flavor) => flavor.id === selectedFlavors[index]?.id && flavor.ingredients.map((ingredient) => (
                          <div key={ingredient} className="mb-2">
                            <input type="checkbox" checked={selectedFlavors[index]?.ingredients.includes(ingredient)} onChange={() => handleFlavorIngredients(index, ingredient)} className="mr-1" />
                            <label className="text-md">{pizzaIngredients.find(item => item.id === ingredient)?.name}</label>
                          </div>
                        )))}
                      </ul>
                      {/* Ingredientes extras do sabor */}
                      <h4 className="text-md font-semibold mt-6 mb-4">Ingredientes extras:</h4>
                      <ul>
                        {pizzaExtraIngredients.map((extraIngredient) => (
                          <div key={extraIngredient.id} className="mb-2">
                            <input type="checkbox" checked={!!selectedFlavors[index]?.extraIngredients.find((i) => i.id === extraIngredient.id)} onChange={() => handleFlavorExtraIngredients(index, extraIngredient.id)} className="mr-1" />
                            <label className="text-md">{extraIngredient.name} {extraIngredient.price > 0 && `(+R$ ${extraIngredient.price})`}</label>
                          </div>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}

              {/* Observações */}
              <h3 className="text-xl font-semibold mt-6 mb-4">Observações sobre a pizza:</h3>
              <textarea value={observations} onChange={(e) => handleObservations(e.target.value)} placeholder="Observações adicionais" className="w-full border rounded-md p-2"
              />

              {/* Adicionar pizza ao carrinho */}
              <button onClick={() => handleAddCart({ product: null, type: "pizza" })} className="mt-6 p-2 bg-blue-500 text-white rounded">
                Adicionar pizza ao carrinho
              </button>
            </>
          )}
        </div>
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4">Bebidas</h2>

          {/* Bebidas */}
          <h3 className="text-xl font-semibold mt-6 mb-4">Escolha uma bebida</h3>
          {drinks.map((drink) => (
            <div key={drink.id} className="mb-2">
              <div className="flex items-center justify-between">
                <div>{drink.name} - R$ {drink.price}</div>

                {/* Adicionar ao carrinho */}
                <button onClick={() => handleAddCart({ product: drink, type: "product" })} className="p-2 bg-blue-500 text-white rounded">Adicionar ao carrinho</button>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-4">Carrinho de compras</h2>
        {cart.length > 0 ? (
          <div>
            {console.log(cart)}
            <h3 className="text-xl font-semibold mt-6 mb-4">Pizzas:</h3>
            {cart.filter((product) => product.type === "pizza").length === 0 ? (
              <p>Nenhuma pizza no carrinho</p>
            ) : (
              cart.filter((product) => product.type === "pizza").map((product) => (
                <div key={product.id} className="mb-4">
                  <h4 className="text-md font-medium">Pizza {product.data.size.name} - {product.data.size.description}</h4>
                  <button onClick={() => handleRemoveCart(product.id)} className="bg-red-500 text-white rounded px-2 mx-1">Remover</button>
                  <p>Massa: {product.data.dought.name} {product.data.dought.price > 0 && (<><span className="text-red-500">(+R$ {product.data.dought.price})</span></>)}</p>
                  <p>Borda: {product.data.crust.name} {product.data.crust.price > 0 && (<><span className="text-red-500">(+R$ {product.data.crust.price})</span></>)}</p>
                  <p>Sabores: ({product.data.qtyFlavors})</p>
                  <ul>
                    {product.data.flavors.map((flavor, index) => {
                      // Ingredientes que serão removidos: estão no sabor original, mas não no flavor.ingredients
                      const removedIngredients = pizzaFlavors.find(pizza => pizza.name === flavor.name).ingredients
                        .filter(ing => !flavor.ingredients.includes(ing))
                        .map(ing => pizzaIngredients.find(i => i.id === ing)?.name) // Converte o id para o name
                        .join(', ')
                      console.log("removedIngredients:", removedIngredients)
                      return (
                        <li key={index} className="ml-4">
                          <p className="font-medium">{flavor.name} (R$ {flavor.price})</p>
                          <p className="text-xs">Ingredientes da receita original: {flavor.ingredients.map(ing => pizzaIngredients.find(i => i.id === ing).name).join(', ')}</p>
                          {removedIngredients && (
                            <p className="text-xs">Retirar da receita original: {removedIngredients}</p>
                          )}
                          {flavor.extraIngredients.length > 0 && (
                            <p className="text-xs">
                              Ingredientes extras: {flavor.extraIngredients
                                .map(extraIng => {
                                  const foundIngredient = pizzaExtraIngredients.find(i => i.id === extraIng.id);
                                  return foundIngredient ? (
                                    <span key={extraIng.id}>
                                      {foundIngredient.name} <span className="text-red-500">(R$ {extraIng.price})</span>
                                    </span>
                                  ) : null;
                                })
                                .reduce((prev, curr, index) => [prev, ', ', curr]) // Adiciona vírgulas entre os itens
                              }
                            </p>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                  <p>Preço da pizza: <span className="font-medium text-red-500">R$ {product.price}{product.data.qtyFlavors > 1 && '*'}</span></p>
                  {product.data.observations && (<p>Observação: {product.data.observations}</p>)}
                  {product.data.qtyFlavors > 1 && (<p className="text-xs text-red-500">* Quando a pizza tem mais de um sabor, o valor é calculado pelo sabor com o maior preço. Entretanto, os ingredientes extras de cada sabor também somam no cálculo do preço da pizza.</p>)}
                </div>
              )
            ))}
            <h3 className="text-xl font-semibold mt-6 mb-4">Demais produtos:</h3>
            {cart.filter((product) => product.type !== "pizza").map((product) => (
              <div key={product.id} className="mb-4">
                <h4 className="text-md font-medium">{product.data.name}</h4>
                <p>Quantidade:
                  <button onClick={() => handleDecreaseItemCart(product.id)} className="bg-blue-500 text-white rounded px-2 mx-1">-</button>
                  <span>{product.qty}</span>
                  <button onClick={() => handleIncreaseItemCart(product.id)} className="bg-blue-500 text-white rounded px-2 mx-1">+</button>
                  <button onClick={() => handleRemoveCart(product.id)} className="bg-red-500 text-white rounded px-2 mx-1">Remover</button>
                </p>
                <p>Preço: R$ {product.data.price}</p>
              </div>
            ))}
            <h3 className="text-xl font-semibold mt-6 mb-4">Total a pagar: R$ {calculateTotalPrice()}</h3>
          </div>
        ) : (
          <p>O carrinho de compras está vazio.</p>
        )}
      </div>
    </div>
  );
}
