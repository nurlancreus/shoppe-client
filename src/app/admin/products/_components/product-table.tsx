
import { ProductDTOType } from "@/types";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../../_components/ui/table";
import Image from "next/image";
import ProductActions from "./product-actions";
// import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons

// Sample product data
const products: ProductDTOType[] = [
  {
    id: "P001",
    name: "Product 1",
    description: "Description of Product 1",
    price: 250.0,
    stock: 10,
    weight: 1.5,
    height: 10.0,
    width: 5.0,
    material: "Plastic",
    colors: ["Red", "Blue"],
    categories: [{ id: "C001", name: "Category 1" }],
    productImages: [
      {
        fileName: "product1-main.jpg",
        pathName: "https://via.placeholder.com/600x400?text=Main+Image",
        isMain: true,
      },
      {
        fileName: "product1-secondary.jpg",
        pathName: "/img2.jpg",
        isMain: false,
      },
    ],
    rating: 4.5,
    createdAt: new Date(),
  },
  // Add more products as needed
];

export default function ProductTable() {


  return (
    
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Height</TableHead>
            <TableHead>Width</TableHead>
            <TableHead>Material</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Main Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const mainImage = product.productImages.find((img) => img.isMain);
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{`$${product.price.toFixed(2)}`}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{`${product.weight} kg`}</TableCell>
                <TableCell>{`${product.height} cm`}</TableCell>
                <TableCell>{`${product.width} cm`}</TableCell>
                <TableCell>{product.material}</TableCell>
                <TableCell>{product.rating.toFixed(1)}</TableCell>
                <TableCell>
                  {mainImage ? (
                    <div className="relative size-16">
                      <Image
                        src={mainImage.pathName}
                        alt={mainImage.fileName}
                        className="object-cover"
                        fill
                      />
                    </div>
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>
                 <ProductActions id={product.id}/>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={9}>Total Products</TableCell>
            <TableCell className="text-right">{products.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      
    
  );
}
