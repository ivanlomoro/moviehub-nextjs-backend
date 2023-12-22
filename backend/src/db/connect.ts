import moongose from 'mongoose'
import config from '../config/config'
import mongoose from 'mongoose'

const connect = () =>{
    return mongoose.connect(config.db.URI)
}

export default connect