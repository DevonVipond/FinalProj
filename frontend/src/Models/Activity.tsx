const __validate = (name: string, skillLevel: string) => {
    if (!name) {
        throw new Error('Class Activity: Name Required!')
    }
    const getValues: any = (hashMap: any) => {
        const keys = Object.keys(hashMap)
        return keys.map((key: any, arr: any, idx: any) => {return hashMap[key]})
    }

    if ( !(getValues(Activity.ActivityNames).find((a: any) => { return a === name })))
        throw new Error('Class Activity: Unknown Parameter: ' + name)

    if ( !(getValues(Activity.SkillLevel).find((a: any) => { return a === skillLevel })))
        throw new Error('Class Activity: Unknown Parameter: ' + skillLevel)
}

type props = { name: string, skillLevel: string }

export class Activity {
    public static ActivityNames: Record<string, string> = {
        SOCCER: 'soccer',
        BASKETBALL: 'basketball',
        FOOTBALL: 'football',
        SKIING: 'skiing',
    }

    public static SkillLevel: Record<string, string> = {
        BEGINNER: 'beginner',
        INTERMEDIATE: 'intermediate',
        ADVANCED: 'advanced',
    }

    private _name: any
    private _skillLevel: string

    constructor({name, skillLevel}: props) {
        __validate(name, skillLevel)

        this._name = name
        this._skillLevel = skillLevel
    }

    public name(): string { return this._name }
    public skillLevel(): string { return this._skillLevel }

    public toJSON(): props {
        return {
            name: this._name,
            skillLevel: this._skillLevel
        }
    }
}
