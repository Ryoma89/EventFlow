import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES } from "../../../constants/categories"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const Dropdown =  ({ value, onChangeHandler }: DropdownProps) => {

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="bg-auth border-none text-gray-500">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {CATEGORIES.length > 0 && CATEGORIES.map((category) => (
          <SelectItem key={category.name} value={category.name} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default Dropdown