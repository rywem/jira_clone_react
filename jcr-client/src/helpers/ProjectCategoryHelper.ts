import { ProjectCategory } from "../enums/ProjectCategory";


export default class CategoryEnumHelper {
    
    static categoryOptions() {
        let results = [];
        let items = Object.keys(ProjectCategory);
        let keys = items.filter(v => !isNaN(Number(v)));
        let values = items.filter(v => isNaN(Number(v)));
        
        for(let i = 0; i < keys.length; i++) {
            results.push({key: keys[i], value: values[i], text: values[i]})
        }
    
        return results;
    }

    static getCategoryName(category: number) {
        return this.categoryOptions()[category].value;
    }
}

