class ApiResponse {
    constructor(data, message = 'Request was successful') {
      this.data = data;
      this.message = message;
    }
  
    send(res) {
      res.status(200).json({ message: this.message, data: this.data });
    }
  }
  
  export default ApiResponse;
  