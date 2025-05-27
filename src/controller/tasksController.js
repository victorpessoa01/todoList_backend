import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

//GET 
export async function getAllTasks(req, res) {

  try{
    const allTasks = await prisma.tasks.findMany();

    if (!allTasks.length) {
      return res.status(404).json({ message: 'No tasks found' });
    } 

    res.status(200).json(allTasks);

  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }  
}


//POST
export async function createTask(req, res) {

  const { title, description, status, priority } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' })}

  try {
    const task = await prisma.tasks.create({
      data: {
        title,
        description,
          status: status || 'pending', 
          priority: priority || 'medium',    
      },
    })

    res.status(201).json(task);
    
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


//PUT
export async function updateTask(req, res) {
  
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const task = await prisma.tasks.findUnique({ where: { id: Number(id) }})

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.tasks.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        priority,
        updated_at: new Date(),
      },
    })

    res.status(200).json(updatedTask);

  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

//DELETE
export async function deleteTask(req, res) {

const { id } = req.params;

  try {
    const task = await prisma.tasks.findUnique({ where: { id: Number(id) }})

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    prisma.tasks.delete({ where: { id: Number(id) }})

    res.status(204).send();
  }
  catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
