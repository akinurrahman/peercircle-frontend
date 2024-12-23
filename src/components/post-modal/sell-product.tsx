import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const SellProductModal = () => {
    return (
        <div className="space-y-4">
            <Input placeholder="Product Name" />
            <Input type="number" placeholder="Price" />
            <Textarea placeholder="Product Description" />
            <Button className="w-full">List Product</Button>
        </div>
    )
}

