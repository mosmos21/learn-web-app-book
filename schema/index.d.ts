export namespace SchemaModel {
  type Category = {
    id: number
    name: string
  }

  type Task = {
    id: number
    title: string
    content: string | null
    status: "NEW" | "DOING" | "COMPLETED"
    category: Category
  }

  type User = {
    name: string;
  }
}

export namespace Schema {
  type ErrorResponse = { error: string }

  // GET /api/v1/categories
  type GetCategories = {
    response: {
      categories: SchemaModel.Category[]
    }
  }

  // POST /api/v1/categories
  type PostCategories = {
    requestBody: {
      name: string
    }
    response: {
      category: SchemaModel.Category
    }
  }

  // GET /api/v1/tasks
  type GetTasks = {
    query: {
      categoryId: string
    }
    response: {
      tasks: SchemaModel.Task[]
    }
  }

  // POST /api/v1/tasks
  type PostTasks = {
    requestBody: {
      title: string
      content?: string
      categoryName: string
    }
    response: {
      task: SchemaModel.Task
    }
  }

  // GET /api/v1/auth/me
  type GetAuthMe = {
    response: {
      user: SchemaModel.User
    }
  }

  // POST /api/v1/auth/sign_up
  type PostAuthSignUp = {
    requestBody: {
      loginId: string
      name: string
      password: string
    }
    response: {
      user: SchemaModel.User
    }
  }

  // POST /api/v1/auth/sign_in
  type PostAuthSignIn = {
    requestBody: {
      loginId: string;
      password: string;
    }
    response: {
      user: SchemaModel.User
    }
  }
}
