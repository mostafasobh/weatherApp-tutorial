const btn =document.querySelector('button')
const key= 'aa0a48837374b491a468c68ca8346e59'

  // weather api get request to get temperature
    const getWeatherInfo = async( url='',zipCode,key)=>{
    const response= await fetch(`${url}${zipCode}&appid=${key}`).then(data=>data.json())
    return response
    }


    //post data to server.js to('http://localhost:port) route
    const postData=async(url='',data={})=>{
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(data) 
          });
          return response.json(); 
    }

    //get data from server.js to('http://localhost:port) route
    const getData=async(url)=>{
      const response = await fetch(url).then(data=>data.json())
        return response
    }

    //getMonth() is not accurate cuz it starts from 0
     // Create a new date instance dynamically with JS
     const newDate=()=>{
      let d = new Date();
      let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear();
      return newDate
    }
  

    btn.addEventListener('click',()=>{
      const zipCode =document.querySelector('#zipCode').value.trim()
      const userInput =document.querySelector('#txtInput').value

      getWeatherInfo('https://api.openweathermap.org/data/2.5/weather?zip=',zipCode,key).then(data=>{
        const temp = data.main.temp
        return temp;
      }).then(temperature=>{
        postData('http://localhost:3000/weather',{temperature,Date:newDate(),userInput})
      }).then(()=>{

        getData('http://localhost:3000/weather').then(data=>{
          // updating the ui to display data
          const newDiv= document.createElement('div')
          const newList =document.createElement('ul')
          newDiv.setAttribute('id','Info')
          document.body.appendChild(newDiv)

          //adding new li based on the the keys and values in projectData object
          newDiv.appendChild(newList)
            Object.keys(data).forEach(key=>{
              const liElem= document.createElement('li')
              liElem.appendChild(document.createTextNode(`${key} is : ${data[key]}`))
              newList.appendChild(liElem)
            })
        }).catch(err=>{
          err ? console.log('get request from server error'+ err) : null
        })

      }).catch(err=>{
        err ? console.log('post request and get request from server error'+ err) : null
      })

    })

   



    getData('http://localhost:3000/weather')