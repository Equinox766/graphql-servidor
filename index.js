import express from 'express';
// graphql
import { graphqlHTTP } from 'express-graphql';  
import {schema} from './data/schema';


const app = express();

app.get('/', (req, res) =>{
    res.send('todo listo');
});



app.use('/graphql', graphqlHTTP({
    //El esquema que va a utilizar
    schema,
    // Utilizar Graphiql
    graphiql: true
}));

app.listen(8000, () => console.log('El servidor esta funcionando'));

