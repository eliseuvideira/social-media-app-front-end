const apiUrl = process.env.API_URL;

interface IPost {
  _id?: any;
  content: string;
  likes?: any[];
  comments?: any[];
  postedBy?: any;
  photo?: {
    url: string;
    filename: string;
    contentType: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export class Post implements IPost {
  public static async find(token: string): Promise<Post[]> {
    const response = await fetch(`${apiUrl}/posts`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error.message);
    }
    return data.posts.map((post: any) => new Post(post));
  }

  public static async findOne(_id: string, token: string): Promise<Post> {
    const response = await fetch(`${apiUrl}/posts/${_id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error.message);
    }
    return new Post(data.post);
  }

  public _id?: any;
  public content: string;
  public likes?: any[];
  public comments?: any[];
  public postedBy?: any;
  public createdAt?: Date;
  public updatedAt?: Date;
  public photo?: {
    url: string;
    filename: string;
    contentType: string;
  };

  constructor({
    _id,
    content,
    likes,
    comments,
    postedBy,
    photo,
    createdAt,
    updatedAt,
  }: IPost) {
    this._id = _id;
    this.content = content;
    this.likes = likes;
    this.comments = comments;
    this.postedBy = postedBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.photo = photo;
  }

  public async insert(
    token: string,
    photo: File | undefined = undefined,
  ): Promise<Post> {
    const formData = new FormData();
    formData.append('content', this.content);
    photo && formData.append('photo', photo);

    const response = await fetch(`${apiUrl}/posts`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.error.message);
    }
    return new Post(data);
  }

  public async update(token: string): Promise<Post> {
    const response = await fetch(`${apiUrl}/posts/${this._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: this.content }),
    });
    const data = await response.json();
    if (response.status !== 201) {
      throw new Error(data.error.message);
    }
    return new Post(data);
  }

  public async delete(token: string): Promise<void> {
    const response = await fetch(`${apiUrl}/posts/${this._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 204) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
  }

  public async like(token: string) {
    const response = await fetch(`${apiUrl}/posts/${this._id}/like`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error.message);
    }
    return new Post(data);
  }

  public async dislike(token: string) {
    const response = await fetch(`${apiUrl}/posts/${this._id}/dislike`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      throw new Error(data.error.message);
    }
    return new Post(data);
  }
}
