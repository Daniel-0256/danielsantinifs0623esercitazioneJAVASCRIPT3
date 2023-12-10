/* fetch("https://striveschool-api.herokuapp.com/api/put-your-endpoint-here/", {
headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8"
    }
    })*/

    const urlApi = "https://striveschool-api.herokuapp.com/api/product/"
    const phoneId = ""
    const urlWithPhoneId = `https://striveschool-api.herokuapp.com/api/product/${phoneId}`
    
    const options = {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8",
            "Content-Type": "application/json",
            },
    }
    
    fetchShowPhonesArray(urlApi, options)
    
    async function fetchShowPhonesArray(url, option) {
        const response = await fetch(url, option)
        const data = await response.json()
        console.log(data)
    }
    
    async function fetchPhone(url, option) {
        const response = await fetch(url, option)
        const data = await response.json()
    }
    
    function createPhone(name, description, brand, imageUrl, price) {
        return {
            "name": name,
            "description": description,
            "brand": brand,
            "imageUrl": imageUrl,
            "price": parseFloat(price),
        }
    }
    
    function postPhone(name, description, brand, imageUrl, price) {
        return {
            method: 'POST',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8",
                "Content-Type": "application/json",
                },
            body: JSON.stringify(createPhone(name, description, brand, imageUrl, price))
        }
    }
    
    function putPhone(newName, newDescription, newBrand, newImageUrl, newPrice) {
        return {
            method: 'PUT',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8",
                "Content-Type": "application/json",
                },
            body: JSON.stringify(createPhone(newName, newDescription, newBrand, newImageUrl, newPrice))
        }
    }
    
    function deletePhone() {
        return {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8",
                "Content-Type": "application/json",
                },
        }
    }

    //FORM PAGE
    const cardsContainer = document.querySelector(".cardsContainer")
    const newPhonePage = document.querySelector("#newPhonePage")
    const btnNewPhone = document.querySelector(".btnNewPhone")
    const closeIcon = document.querySelector(".closeIcon")
    const phoneName = document.querySelector("#phoneName")
    const phoneDesc = document.querySelector("#phoneDesc")
    const phoneBrand = document.querySelector("#phoneBrand")
    const phoneImgUrl = document.querySelector("#phoneImgUrl")
    const phonePrice = document.querySelector("#phonePrice")
    const btnReset = document.querySelector("#btnReset")
    const btnCreate = document.querySelector("#btnCreate")

    const pageEdit = document.querySelector("#pageEdit")
    const closeIconEdit = document.querySelector(".closeIconEdit")
    const editPhone = document.querySelector("#editPhone")
    const deletPhone = document.querySelector("#deletPhone")
    const phoneNameDelet = document.querySelector("#phoneNameDelet")

    let objectUrl = ""

    showPhoneCards(urlApi, options)

    btnNewPhone.addEventListener('click', () => {
        newPhonePage.style.display = 'block'
        phoneName.value = ''
        phoneDesc.value = ''
        phoneBrand.value = ''
        phoneImgUrl.value = ''
        phonePrice.value = ''
    })
    
    closeIcon.addEventListener('click', () => {
        newPhonePage.style.display = 'none'
    })
    
    btnReset.addEventListener('click', (event) => {
        event.preventDefault()
        phoneName.value = ''
        phoneDesc.value = ''
        phoneBrand.value = ''
        phoneImgUrl.value = ''
        phonePrice.value = ''
    })
    
    btnCreate.addEventListener('click', (event) => {
        event.preventDefault()
        if (phoneName.value !== '' && phoneDesc.value !== '' && phoneBrand.value !== '' &&  phoneImgUrl.value !== '' && phonePrice.value !== '') {
            fetchPhone(urlApi, postPhone(phoneName.value, phoneDesc.value, phoneBrand.value, phoneImgUrl.value, phonePrice.value))
            let cards = ''
            cards += `
            <div class="cardContainer">
                <img src="${phoneImgUrl.value}" alt="nokia">
                <p>${phoneName.value}</p>
                <div class="btnsContainer">
                    <button class="btnDetail">Details</button>
                    <button class="btnEdit">Edit</button>
                </div>
            </div>`
            cardsContainer.innerHTML += cards
            newPhonePage.style.display = 'none'
        }
        else {
            alert('Fill all the boxes')
        }
    })
    
    async function showPhoneCards(url, option) {
        const response = await fetch(url, option)
        const data = await response.json()
    
        let cards = ''
        for (let i = 0; i < data.length; i++) {
            cards += createCard(data[i])
        }
        cardsContainer.innerHTML = cards

        const btnsEdit = document.querySelectorAll(".btnEdit")

        for (let i = 0; i < btnsEdit.length; i++) {
            btnsEdit[i].addEventListener('click', () => {
              pageEdit.style.display = 'block'
              phoneNameDelet.value = data[i].name
              objectUrl = urlApi + data[i]._id
            })
        }
        deletPhone.addEventListener('click', (e) => {
            e.preventDefault()
            const phoneNames = document.querySelectorAll(".phoneName")
            for (let i = 0; i < phoneNames.length; i++) {
                if (phoneNames[i].textContent === phoneNameDelet.value) {
                    phoneNames[i].closest(".cardContainer").remove()
                }
            }
            fetchPhone(objectUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZkZTJjNmEwZDAwMTg0OTU5YjYiLCJpYXQiOjE3MDIxMTkxNjQsImV4cCI6MTcwMzMyODc2NH0.aKlQ21GBttdLoKboh4ANjO73oMr7rdx6dFRWkHPBMO8",
                    "Content-Type": "application/json",
                    },
            })

            pageEdit.style.display = "none"
        })

    }
    
    function createCard(phone) {
        return `
        <div class="cardContainer">
            <img src="${phone.imageUrl}" alt="nokia">
            <p class="phoneName">${phone.name}</p>
            <div class="btnsContainer">
                <button class="btnDetail">Details</button>
                <button class="btnEdit">Edit</button>
            </div>
        </div>`
    }

    closeIconEdit.addEventListener('click', () => {
        pageEdit.style.display = 'none'
    })
