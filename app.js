const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Todo } = require('./models/index');

const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: false,
}));
app.use(cors());

app.get('/', (req, res) => {
	res.send('daa');
})

app.post('/addtodo', async (req, res) => {
	try {
        const { task, } = req.body;

		const todo = await Todo.create({
			task,
		});
		res.send(todo);
	} catch (error) {
		console.log(error);
	}
});
app.put('/edittodo/:id', async (req, res) => {
	try{
		const {
			newTask,
		} = req.body;
		const {
			id,
		} = req.params;
		if(!id){
			res.send('id nije poslat');
		}
		const edit = await Todo.findOne(
			{
				where:{ id}
			},
		);
		edit.task = newTask;
		await edit.save();
		res.send(edit);
	}catch (error) {
		console.log(error);
	}
});

app.delete('/delete/:id', async (req, res) => {
	try{
		const {id,} = req.params;

		if(!id){
			res.send('Task je vec obrisan');
		}
		await Todo.destroy({
				where:{id}
			});
	}catch (error) {
		console.log(error);
	}
});

app.post('/completetask/:id', async (req, res) => {
	try{
		const {id} = req.params;
		const {isCompleted} = req.body;


		const completed = await Todo.findOne({
			where: {id}
		});
		if(isCompleted){
			completed.complete = true;
		}else{
			completed.complete = false;
		}
		completed.save();
		res.send(completed);
	}catch (error) {
		console.log(error);
	}
});
app.get('/alltask', async(req, res) => {

		const alltask = await Todo.findAll();

		res.send(alltask);
});

app.listen(8080, () => console.log('Example app listening on port 3000!'));