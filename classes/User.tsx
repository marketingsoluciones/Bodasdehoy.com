interface InterfaceUsuario {
  nombre: string;
  email: string;
  contraseña: string;
}

export class Usuario {
  nombre: string;
  email: string;
  contraseña: string;

  constructor(props: InterfaceUsuario) {
    this.nombre = props.nombre;
    this.email = props.email;
    this.contraseña = props.contraseña;
  }
}


interface InterfaceNovio extends InterfaceUsuario {
  ciudad: string;
  pais: string;
  fechaBoda: string;
  telefono: number;
}


export class Novio extends Usuario implements InterfaceNovio {
  ciudad: string;
  pais: string;
  fechaBoda: string;
  telefono: number;
  constructor(props: InterfaceNovio) {
    super({ ...props });
    this.ciudad = props.ciudad;
    this.pais = props.pais;
    this.fechaBoda = props.fechaBoda;
    this.telefono = props.telefono;
  }
}
