import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/types"
import { toast } from "../ui/use-toast"
import initialCategories from "@/constants/categories";

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories)
  const [newCategory, setNewCategory] = useState('');

  const getCategories = async () => {
    try {
      const categoryList = await getAllCategories();
      if (categoryList) {
        setCategories(categoryList as ICategory[]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const handleAddCategory = async () => {
    const trimmedCategory = newCategory.trim();
    if (!trimmedCategory) {
      toast({
        title: "Error",
        description: "Category name cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      const newCategory = await createCategory({ categoryName: trimmedCategory });
      if (newCategory) {
        await getCategories();
        toast({
          title: "✅ Category Added",
          description: `${trimmedCategory} has been added successfully.`,
        });
        setNewCategory("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to add category: ${error}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="bg-gray-50 border-none text-gray-500">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
              Add new category
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-10/12">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => {
                    e.stopPropagation();
                    setNewCategory(e.target.value);
                  }}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default Dropdown