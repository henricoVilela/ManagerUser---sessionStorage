class User { //Classe com a finalidade de ter os metodos responsaveis pela manipulacao dos dados dos usuarios.

	//Contrutor da class User
	constructor(name, gender, birth, country, email, pass, photo, admin){
		this._id; //att para guardar o identificador unico de cada registro
		this._name = name;
		this._gender = gender;
		this._birth = birth;
		this._country = country;
		this._email = email;
		this._password = pass;
		this._photo = photo;
		this._admin = admin;
		this._register = new Date();
	}

	get id(){
		return this._id;
	}

	get name(){
		return this._name;
	}

	get gender(){
		return this._gender;
	}

	get birth(){
		return this._birth;
	}

	get country(){
		return this._country;
	}

	get email(){
		return this._email;
	}

	get password(){
		return this._pass;
	}

	get photo(){
		return this._photo;
	}

	get admin(){
		return this._admin;
	}

	get register(){
		return this._register;
	}

	set photo(value){
		this._photo = value;
	}

	//Apartir de um objeto Json carrega a instancia da classe 'User' com os respectivos valores
	loadFromJson(json){

		for (let name in json){

			switch(name){
				case '_register':
					this[name] = new Date(json[name]);
				break;

				default:
					this[name] = json[name];
			}

			
		}
	}//loadFromJson

	//Metodo estatico para recuperar todos os dados da sessionStorage/localStorage
	static getUsersStorage(){
        let users = [];
        let usersSection = sessionStorage.getItem("users");

        //para usar o lacalStorage basta fazer o seguinte:
        //localStorage.setItem("users",JSON.stringify(users));

        if(usersSection){
            users = JSON.parse(usersSection);
        }

        return users;
    }//getUsersStorage

    //Pega o ultimo id da session e incrementa, para garantir um registro unico. Como e uma primary key.
    getNewId(){
    	let usersId = parseInt(sessionStorage.getItem('usersId'));

    	if(!usersId) usersId = 0;

    	usersId++;
    	sessionStorage.setItem('usersId',usersId);

    	return usersId;
    }//getNewId

    //Salva os dados na sessionStorage/localStorage
	save(){
		let users = User.getUsersStorage();

		if(this.id > 0){
			users.map(u=>{

				if(u._id == this.id){
					//mescla os valores dos objetos e retorna um json ao inves de uma instacia da classe User
					Object.assign(u,this);
				}

				return u;
			});

		}else{
			this._id = this.getNewId();

			users.push(this);

	        
		}

        //a informacao se perde somente se fechar o navegador ou limpar o sessionStorage
	    sessionStorage.setItem("users",JSON.stringify(users));

        //para usar o lacalStorage basta fazer o seguinte:
        //localStorage.setItem("users",JSON.stringify(users));
	}//save

	//Remove os valores da session de acordo com o seu ID
	remove(){
		let users = User.getUsersStorage();

		users.forEach((userData,index)=>{
			if(this._id == userData._id){
				//propriedade do array que a parti de um index (se encontrado), quantas posicoes excluir? (segundo parametro)
				users.splice(index,1);
			}
		});

		//se ja houver o item 'users' sera substituido pelo novo array
	    sessionStorage.setItem("users",JSON.stringify(users));
	}//remove
}