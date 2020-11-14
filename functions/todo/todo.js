// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {

    if(event.httpMethod==='GET'){
      console.log('Get request ==>>');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Requset ${event.httpMethod}` }),
      }
    }

    else if(event.httpMethod==='POST'){
      console.log('Post request ==>>');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Requset ${event.httpMethod}` }),
      }
    }

    // console.log(JSON.stringify(event));
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `the ${event.httpMethod} is not supported` }),
    }

  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
