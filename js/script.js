document.getElementById('getUsers').addEventListener('click', function() {
    fetch('http://localhost/API/index.php')
        .then(response => response.json())
        .then(data => {
            let users = '';
            data.forEach(user => {
                users += `<div>
                                <p>id ${user.id} </p>
                                
                              <input type="text" value="${user.name}" id="name_${user.id}" placeholder="Nombre">
                              <input type="text" value="${user.email}" id="email_${user.id}" placeholder="Email">
                              <button onclick="llamardatos(${user.id},'${user.name}','${user.email}')" >Editar</button>
                              <button onclick="deleteUser(${user.id})" >Eliminar</button>
                          </div>`;
            });
            document.getElementById('users').innerHTML = users;
        })
        .catch(error => console.error('Error:', error));
});


document.getElementById('agregar').addEventListener('click', function(event) {
    event.preventDefault();
    let name = document.getElementById("nombre").value; 
    let email = document.getElementById("gmail").value;

    fetch(`http://localhost/API/index.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  name: name, email: email})
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            alert('Usuario agregado: ' + data.message);
        // Actualizar la lista de usuarios después de agregar
        document.getElementById('getUsers').click();
        // Limpiar campos de entrada después de agregar
        document.getElementById('nombre').value = '';
        document.getElementById('id').value = '';
        document.getElementById('gmail').value = '';
        })
       
});

function llamardatos(id,nombre,gmail){
    document.getElementById("id").value = id;
    document.getElementById('id').value = '';
    document.getElementById("nombre").value = nombre;
    document.getElementById("gmail").value = gmail;
}

function deleteUser(id) {
    fetch('http://localhost/API/index.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuario eliminado: ' + data.message);
        document.getElementById('getUsers').click();
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('editar').addEventListener('click', function(event) {
    event.preventDefault();
    let id = document.getElementById("id").value; 
    let name = document.getElementById("nombre").value; 
    let email = document.getElementById("gmail").value;
    fetch(`http://localhost/API/index.php`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  id: id, name:name, email:email})
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            alert('Usuario agregado: ' + data.message);
        // Actualizar la lista de usuarios después de agregar
        document.getElementById('getUsers').click();
        // Limpiar campos de entrada después de agregar
        document.getElementById('id').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('gmail').value = '';
        })
       
});
