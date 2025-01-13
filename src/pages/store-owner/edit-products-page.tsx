import { useParams } from "react-router-dom";

export default function EditProductsPage() {
  const { id } = useParams();
  return <div>EditProductsPage {id}</div>;
}
