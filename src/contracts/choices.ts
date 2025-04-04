export type IconChoiceTypes = 'system' | 'website' | 'app' | 'hosting' | 'store'

export interface ChoiceType {
  icon: IconChoiceTypes
  text: string
  value: string
}
