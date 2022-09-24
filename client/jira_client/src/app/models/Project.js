export class Project {
    constructor(data) {
        this.id = data.id,
        this.url = data.url,
        this.description = data.description,
        this.createdUtc = data.createdUtc,
        this.updatedUtc = data.updatedUtc,
        this.category = data.category,
        this.issues = data.issues,
        this.appUsers = data.appUsers
    }
}