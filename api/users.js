let API_ADDRESS = "127.0.0.1:3000"

import axios from "axios";

const users = {

    async login(email, password) {
        try {
            const response = await axios.create().post(`${API_ADDRESS}/login`, {
                email: email,
                password: password,

            }, "Content-type: application/json"
            )

            if (response.ok) {
                return response.json()
            } else {
                throw Error(response)
            }
        } catch (err) {
            if (err.response.status == 400) {
                return {
                    resStatus: {
                        status: err.response.status,
                        message: err.response.data
                    }
                };
            } else if (err.response.status == 500) {
                return {
                    resStatus: {
                        status: err.response.status,
                        message: err.response.data
                    }
                };
            } else {
                return {
                    resStatus: {
                        status: 500,
                        message: "Something went wrong, please try again!!"
                    }
                };
            }
        }
    }




}

export default users;