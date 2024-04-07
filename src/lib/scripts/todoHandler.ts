import { getToken } from "./requestHandler";
import { backendURL } from "./variables";


export interface Category{
    Id:number,
    Title:string,
    Color:string
}

export interface Task{
    Id:number,
    Title:string,
    Completed:boolean
}



export async function getTasksAPI(){
    const response = await fetch(`${backendURL}/todo/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`
        }
    });
    if(response.ok){
        let data = await response.json();
        let info = data.map((record:any) => ({
            Category: {
                Id: record.category.id, 
                Title: record.category.title,
                Color: record.category.color
            } as Category,
            Tasks: record.tasks.map((task:any) => ({
                Id: task.id,
                Title: task.title,
                Completed: task.completed
            })) as Task[]
        }));

        return info;
    }
    return undefined;

}

export async function createTaskAPI(categoryId:number, title:string){
    const resource = {
        CategoryId: categoryId,
        Title: title,
        Completed: false
    }
    console.log("kurt cobain pov")
    console.log(resource)
    const response = await fetch(`${backendURL}/todo/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
    });

    if(response.ok){
        console.log("got it sent");
        
        var data = await response.json();
        console.log("read it")
        var task:Task = {
            Id: data.id,
            Title: data.title,
            Completed: data.completed
        }
        console.log("returning")
        return task;
    }
    return undefined;
}

export async function deleteTaskAPI(taskId:number){
    const response = await fetch(`${backendURL}/todo/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskId)
    });
    if(response.ok){
        return true;
    }
    return false;
}

export async function updateTaskAPI(taskId:number, title:string, completed:boolean){
    const resource = {
        Id: taskId,
        Title: title,
        Completed: completed
    }

    const response = await fetch(`${backendURL}/todo/update`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
    });
    if(response.ok){
        return true;
    }
    
    return false;
}


export async function createCategoryAPI(title:string, color:string){
    const resource ={
        Title:title,
        Color:color,
        CategoryID: -1
    }
    
    const response = await fetch(`${backendURL}/todo/category/create`, {
        method:'POST',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
    });

    if(response.ok){
        return true;
    }

    return false;
}

export async function updateCategoryAPI(categoryId:number, title:string, color:string){
    const resource = {
        CategoryID: categoryId,
        Title: title,
        Color: color
    };
    console.log(resource);
    const response = await fetch(`${backendURL}/todo/category/rename`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(resource)
    });
    console.log(response);
    if(response.ok){
        return true;
    }

    return false;
}

export async function deleteCategoryAPI(categoryId:number){
    const response = await fetch(`${backendURL}/todo/category/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryId)
    });
    if(response.ok){
        return true;
    }

    return false;
}

export async function getCategoriesAPI(){
    const response = await fetch(`${backendURL}/todo/category/get`,{
        method:'GET',
        headers: {
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    
    if(response.ok){
        const data = await response.json()
        let categories = data.map((record:any) => ({
            Id: record.id,
            Title: record.title,
            Color: record.color
        })) as Category[];
        categories = [
            {
                Id: -1,
                Title: "None",
                Color: "#CCCCCC"
            },
            ...categories
        ];

        return categories;
    }
    
    return [];
}
