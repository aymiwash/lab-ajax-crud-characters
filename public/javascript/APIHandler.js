class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    try {      
      const response = await axios.get(`${this.BASE_URL}/characters`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getOneRegister(id) {
    try {   
      const response = await axios.get(`${this.BASE_URL}/characters/${id}`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
    }
  }

  async createOneRegister(newCharacterObj) {
    try {      
      const response = await axios.post(`${this.BASE_URL}/characters`, newCharacterObj)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
      return newCharacterObj
    }
  }

  async updateOneRegister(id, charToUpdate) {
    try {     
      const response = await axios.patch(`${this.BASE_URL}/characters/${id}`, charToUpdate)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.error(error)
      return "Character not found"
    }
  }

  // async updateAllOneRegister(id, charToUpdate) {
  //   try {     
  //     const response = await axios.put(`${this.BASE_URL}/characters/${id}`, charToUpdate)
  //     if (response.status === 200) {
  //       return response.data
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     return "Character not found"
  //   }
  // }

  async deleteOneRegister(id) {
    try {      
      const response = await axios.delete(`${this.BASE_URL}/characters/${id}`)
      if (response.status === 200) {
        // return "Character has been successfully deleted"; 
        return true
      }
    } catch (error) {    
      console.error(error) 
      // return "Cannot find the character to delete"
      return false
    }
  }
}
