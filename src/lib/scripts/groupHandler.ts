import { getToken } from "./requestHandler";
import { backendURL } from "./variables";

export interface Group{
    Id:number,
    Name:string,
    OwnerID:number,
}


export async function createGroup(name:string, joinCode:string){
    const resource = {
        Name:name,
        JoinCode:joinCode
    };
    
    const response = await fetch(`${backendURL}/group/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(resource)
    });

    if(response.ok){
        alert("Group Created Successfuly")
    }
    else{
        alert(response.statusText)
    }
}

export async function joinGroup(joinCode:string){
    const response = await fetch(`${backendURL}/group/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(joinCode)
    });

    if(response.ok){
        alert("Group joined Successfuly")
    }
    else{
        alert("Problem")
    }
}

export async function leaveGroup(groupID:number) {
    const response = await fetch(`${backendURL}/group/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(groupID)
    });

    if(response.ok){
        alert("Group left Successfuly")
    }
    else{
        alert("Problem")
    }
}

export async function deleteGroup(groupID:number) {
    const response = await fetch(`${backendURL}/group/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${await getToken()}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(groupID)
    });

    if(response.ok){
        alert("Group deleted Successfuly")
    }
    else{
        alert("Problem")
    }
}

export async function getGroups(){
    const response = await fetch(`${backendURL}/account/getGroups`,{
        method:'GET',
        headers:{
            'Authorization': `Bearer ${await getToken()}`,
            'Content-Type': 'application/json'
        }
    });
    var data = await response.json();
    console.log(data);
    if(data){
        const groups: Group[] = await data.groups.map((group: any) => ({
            Id: group.id,
            Name: group.name,
            OwnerID: group.ownerID
        })) ;
        return groups;
    }
    return [];
}