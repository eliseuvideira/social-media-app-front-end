const apiUrl = process.env.API_URL;

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_OK_NO_BODY = 204;

interface IUser {
  _id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export class User implements IUser {
  public _id?: string;
  public name: string;
  public email: string;
  public createdAt?: Date;

  constructor({ _id, name, email, createdAt }: IUser) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  public static async signIn(
    email: string,
    password: string,
  ): Promise<[User, string]> {
    const response = await fetch(`${apiUrl}/sign-in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status !== STATUS_OK) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
    const data = await response.json();
    return [
      new User({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        createdAt: data.user.createdAt,
      }),
      data.token,
    ];
  }

  public static async signOut(token: string): Promise<void> {
    const response = await fetch(`${apiUrl}/sign-out`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== STATUS_OK) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
  }

  public static async find(): Promise<User[]> {
    const response = await fetch(`${apiUrl}/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== STATUS_OK) {
      throw new Error(data.error.message);
    }
    return data.users.map(
      (user: IUser) =>
        new User({
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        }),
    );
  }

  public static async findOne(_id: string, token: string): Promise<User> {
    const response = await fetch(`${apiUrl}/users/${_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== STATUS_OK) {
      throw new Error(data.error.message);
    }
    const { user } = data;
    return new User({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  }

  public async update(token: string): Promise<this> {
    const response = await fetch(`${apiUrl}/users/${this._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.name }),
    });
    const data = await response.json();
    if (response.status !== STATUS_OK) {
      throw new Error(data.error.message);
    }
    return this;
  }

  public async insert(password: string): Promise<this> {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.name, email: this.email, password }),
    });
    const data = await response.json();
    if (response.status !== STATUS_CREATED) {
      throw new Error(data.error.message);
    }
    this._id = data.user._id;
    return this;
  }

  public async remove(token: string): Promise<this> {
    if (!this._id) {
      throw new Error(`User not saved`);
    }
    const response = await fetch(`${apiUrl}/users/${this._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== STATUS_OK_NO_BODY) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
    return this;
  }
}
