require("rootpath")();
const app = require('./app')




const PORT = process.env.PORT || 4000;


app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
