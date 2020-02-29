export interface IPage {
  title: string
  icon: string
  path: string
  match?: RegExp
  post?: IPost
}

export interface ICategory {
  number: string
  title: string
}

export interface ITag {
  name: string
}

export interface ILink {
  id: string
  title: string
  url: string
}

export interface IPost {
  number: string
  title: string
  bodyHTML: string
  category: ICategory
  tags: { nodes: ITag[] }
  createdAt: Date
  updatedAt: Date
  next?: IPost
  prev?: IPost
}

export interface ILayout {
  site: {
    url: string
    title: string
    subtitle: string
    description: string
    keywords: string
  }
  pages: IPage[]
  sider: {
    categories: ICategory[]
    tags: ITag[]
    posts: IPost[]
  }
  lastBuilt: Date
}
