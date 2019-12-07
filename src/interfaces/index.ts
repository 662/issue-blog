export interface IMilestone {
  number: string
  title: string
}

export interface ILabel {
  name: string
}

export interface ILink {
  id: string
  title: string
  url: string
}

export interface IIssue {
  number: string
  title: string
  bodyHTML: string
  milestone: IMilestone
  labels: { nodes: ILabel[] }
  createdAt: Date
  updatedAt: Date
}

export interface IPageInfo {
  endCursor: string
  hasNextPage: boolean
}

export interface IIssues {
  pageInfo: IPageInfo
  nodes: IIssue[]
}

export interface IQueryPostResult {
  repository: {
    issue: IIssue
  }
}
export interface IQueryPostsResult {
  repository: {
    issues: IIssues
  }
}
export interface IQueryCategoryPostsResult {
  repository: {
    milestone: {
      issues: IIssues
    }
  }
}

export interface ISearchResult {
  search: IIssues
}

export interface IQuerySiderResult {
  repository: {
    milestones: { nodes: IMilestone[] }
    labels: { nodes: ILabel[] }
    issues: { nodes: IIssue[] }
  }
}
