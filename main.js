(function () {
    let total = 0
    const cartContent = document.querySelector('.cartDescription')
    const container = document.querySelector('.cartContainer')
    const emptyContainer = document.querySelector('.emptyContainer')
    let quantity = document.querySelector('#quantityValue')
    let quantityValue = parseInt(document.querySelector('#quantityValue').innerText)
    const buttons = document.querySelectorAll('.icon')
    const addButton = document.querySelector('.addToCartButton')
    const cartQuantity = document.querySelector('.cartQuantity')
    const cartButton = document.querySelector('.cartButton')
   const cart = document.querySelector('.openedCart')
    const checkoutButton = document.querySelector('.cartCheckout')
    checkoutButton.addEventListener('click', checkout)
    buttons.forEach(button => {
        button.addEventListener('click', changeQuantity)
    })
    addButton.addEventListener('click', addProduct)
    cartButton.addEventListener('click', toggleCart)
    function changeQuantity(e) {
        if(e.target.classList.contains('plus')) {
            quantityValue++
            quantity.innerText = quantityValue
            console.log(quantityValue)
        }
        if(e.target.classList.contains('minus') && quantityValue>0) {
            quantityValue--
            quantity.innerText = quantityValue
        }
    }
  
    function isUnique(id) {
        const products = document.querySelectorAll('.cartContainer li')
        products.forEach(product => {
            if(product.dataset.id === id) return false
            else return true
        })
    }
    function toggleCart() {
        cart.classList.toggle('show')
        setTimeout(() => {
            window.addEventListener('mouseup',function(event){
                if(event.target != cart && event.target.parentNode != cart && event.target !== cartButton && !event.target.classList.contains('delete')){
                    cart.classList.remove('show')
                }
          });  
        }, 10);
    }
  
    function totalPriceCalc(product) {
        product.querySelector('.totalPrice').innerText = '$' + (125 * total).toFixed(2);
    }

    //innerHTML method for demo purposes only
    function addProduct (e) {
        if(quantityValue>0) {
        cartContent.classList.remove('hide')
            emptyContainer.classList.remove('show')
           
                if(container.getElementsByTagName('li').length === 0 || isUnique()) {

            

                    const li = document.createElement('li')
                    li.dataset.id = 'shoes1'
                    li.classList.add('cartProductDescription')
                    li.innerHTML = '<div class="thumbnail"><img src="/images/image-product-1-thumbnail.jpg"></div><section class="productPriceContainer"><h2>Fall Limited Edition Sneakers</h2><div><div class="priceContainer"><span class="priceWithDiscount">$125.00</span> x <span class="quantityInCart">0</span></div> <span class="totalPrice">0</span></div></section><div><span class="icon delete"></span></div>'
                    addToCart(li)
                    container.appendChild(li)
                        
                    }
                    else if(!isUnique()) {
                        let products = container.querySelectorAll('li')
                        products.forEach(product => {
                            if(product.dataset.id === e.target.dataset.id) {
                                addToCart(product)
                            }
                        })
                    }
            }
     
        
        

    }
    function addToCart(product) {
     
        if(quantityValue>0) cartQuantity.classList.add('show')

        let cartAmount = total + quantityValue
        total = cartAmount
        cartQuantity.innerText = total
        product.querySelector('.quantityInCart').innerText = total
        quantityValue = 0
        quantity.innerText = quantityValue
        totalPriceCalc(product)
        product.querySelector('.delete').addEventListener('click', deleteList)
    }
    function deleteList(e) {
        let list = e.target.closest('.cartProductDescription')
        container.removeChild(list)
        if(container.getElementsByTagName('li').length === 0) {
            
       
            emptyCart()
        }


    }
    function emptyCart() {
        cartContent.classList.add('hide')
        emptyContainer.classList.add('show')
        cartQuantity.classList.remove('show')
     
        total = 0
        
  
    }

    function checkout() {
        emptyCart()
        cart.classList.remove('show')
    }

    

       
    
   
})();


(function() {
    const mainImage = document.querySelector('main .productImageContainer')
    const closeButton = document.querySelector('.closePopup svg')
    const popupContainer = document.querySelector('.productHighlight')
    const thumbnails = document.querySelectorAll('main .thumbnail img')
    const thumbnailsPopup = document.querySelectorAll('.productHighlight .thumbnail img')
    const mainproductImage = document.querySelector('main .productImageContainer img')
    const mainImagePopup = document.querySelector('.productHighlight .productImageContainer img')
    const arrows = document.querySelectorAll('.arrow')
    let chosenImage = 0
    let currentImage = 0
    const images = [
        {
            id:"0",
            src:"/images/image-product-1.jpg"
        },
        {
            id:"1",
            src:"/images/image-product-2.jpg"
        },
        {
            id:"2",
            src:"/images/image-product-3.jpg"
        },
        {
            id:"3",
            src:"/images/image-product-4.jpg"
        },


]
    function openPopup() {
        if(screen.width>1000) {
        if(chosenImage !==0) currentImage = parseInt(chosenImage)
        else currentImage = 0
     
        popupContainer.classList.toggle('show')
      
        images.forEach(image => {
            if(document.querySelector('.productHighlight').classList.contains('show')) {
                if(image.id == chosenImage) mainImagePopup.src = image.src
            }
        })
        thumbnails.forEach(thumbnail => {
            thumbnail.parentNode.classList.remove('chosen')
        })
        thumbnailsPopup.forEach(thumbnail => {
            if (thumbnail.dataset.id == chosenImage) thumbnail.parentNode.classList.add('chosen')
        })
    }
    }
    slideImages()
    function slideImages() {
        images.forEach(image => {
         
                if(image.id == chosenImage) mainImage.querySelector('img').src = image.src
            
        })
    }
    function closePopup() {
        popupContainer.classList.toggle('show')
    }
    function showProduct(e) {
        const chosen = document.querySelectorAll('.chosen')
        chosen.forEach(chosen => chosen.classList.remove('chosen'))
        
        chosenImage = e.target.dataset.id
        e.target.parentNode.classList.add('chosen')
        console.log(chosenImage)
        images.forEach(image => {
           
           if(document.querySelector('.productHighlight').classList.contains('show')) {
                if(image.id == e.target.dataset.id) {

                    mainImagePopup.src = image.src}
            }
            else {
                if(image.id == e.target.dataset.id) mainproductImage.src = image.src
            }
        })
        
     
   
    }
    mainImage.addEventListener('click', openPopup)
    closeButton.addEventListener('click', closePopup)
    popupContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('show') ) 
       popupContainer.classList.toggle('show')})
       thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', showProduct))
        thumbnailsPopup.forEach(thumbnail => thumbnail.addEventListener('click', showProduct))
    arrows.forEach(direction => {
        direction.addEventListener('click', () => {
        
           if(screen.width<1000) {
            if(direction.classList.contains('arrow-right')) {
                if(currentImage>=3)
                currentImage = 0
                else currentImage++
         
       
                images.forEach(image => {
                if(image.id==currentImage) {

                    mainImage.querySelector('img').src = image.src
                }
            
            })
         
            }
            
            if(direction.classList.contains('arrow-left')) {
                
                if(currentImage<=0) currentImage = 3
                else currentImage--
             
                images.forEach(image => {
                    if(image.id==currentImage) {

                        mainImage.querySelector('img').src = image.src
                    }
                
                })
                thumbnailsPopup.forEach(thumbnail => {
                    thumbnail.parentNode.classList.remove('chosen')
                    if (thumbnail.dataset.id == currentImage) thumbnail.parentNode.classList.add('chosen')
                })
            } 
           }
           if(screen.width>1000) {
            if(direction.classList.contains('arrow-right')) {
                    
                if(currentImage>=3) currentImage = 0
                else currentImage++
                images.forEach(image => {
                if(image.id==currentImage) {

                    mainImagePopup.src = image.src
                }
            
            })
            thumbnailsPopup.forEach(thumbnail => {
                thumbnail.parentNode.classList.remove('chosen')
                if (thumbnail.dataset.id == currentImage) thumbnail.parentNode.classList.add('chosen')
            })
            }
            
            if(direction.classList.contains('arrow-left')) {
                
                if(currentImage<=0) currentImage = 3
                else currentImage--
             
                images.forEach(image => {
                    if(image.id==currentImage) {

                        mainImagePopup.src = image.src
                    }
                
                })
                thumbnailsPopup.forEach(thumbnail => {
                    thumbnail.parentNode.classList.remove('chosen')
                    if (thumbnail.dataset.id == currentImage) thumbnail.parentNode.classList.add('chosen')
                })
            } 
        }
               
            
            
           
        })
       
    })
})();

(function() {
    const openButton = document.querySelector('.openMenu')
    const closeButton = document.querySelector('.closeMenu')
    const menu = document.querySelector('.menu-nav')
    function toggleMenu() {
        menu.classList.toggle('show')
      
    }
    openButton.addEventListener('click', toggleMenu)
    closeButton.addEventListener('click', toggleMenu)
    menu.addEventListener('click', (e) => {
        if(e.target.classList.contains('show') ) 
        menu.classList.toggle('show')})

})()

