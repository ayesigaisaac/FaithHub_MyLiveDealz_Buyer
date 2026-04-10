import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProductCategory = "Books" | "Clothing" | "Accessories";

type ProductDraft = {
  name: string;
  description: string;
  price: string;
  category: ProductCategory | "";
  imageName: string;
  stockQuantity: string;
};

type ProductRecord = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageName: string;
  stockQuantity: number;
};

type FieldErrors = Partial<Record<keyof ProductDraft, string>>;

const initialDraft: ProductDraft = {
  name: "",
  description: "",
  price: "",
  category: "",
  imageName: "",
  stockQuantity: "",
};

function isPositiveNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

function isPositiveInteger(value: string) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0;
}

export default function AddProductForm() {
  const [draft, setDraft] = useState<ProductDraft>(initialDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const canSubmit = useMemo(
    () =>
      draft.name.trim().length > 1 &&
      draft.description.trim().length > 5 &&
      isPositiveNumber(draft.price) &&
      Boolean(draft.category) &&
      draft.imageName.trim().length > 0 &&
      isPositiveInteger(draft.stockQuantity),
    [draft],
  );

  const validate = () => {
    const nextErrors: FieldErrors = {};

    if (draft.name.trim().length < 2) nextErrors.name = "Product name is required.";
    if (draft.description.trim().length < 6) nextErrors.description = "Description is required.";
    if (!isPositiveNumber(draft.price)) nextErrors.price = "Enter a valid price.";
    if (!draft.category) nextErrors.category = "Select a category.";
    if (!draft.imageName.trim()) nextErrors.imageName = "Product image is required.";
    if (!isPositiveInteger(draft.stockQuantity))
      nextErrors.stockQuantity = "Enter a valid stock quantity.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage("");

    if (!validate()) return;

    const record: ProductRecord = {
      id: `product-${Date.now()}`,
      name: draft.name.trim(),
      description: draft.description.trim(),
      price: Number(draft.price),
      category: draft.category as ProductCategory,
      imageName: draft.imageName.trim(),
      stockQuantity: Number(draft.stockQuantity),
    };

    setProducts((prev) => [record, ...prev]);
    setDraft(initialDraft);
    setErrors({});
    setSuccessMessage("Product saved to local mock state.");
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDraft((prev) => ({ ...prev, imageName: file?.name || "" }));
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="fh-label text-[var(--text-muted)]">Provider Merchandise</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Add Product
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--text-secondary)]">
            Create a merchandise product for your ministry store. This form stores data locally for now.
          </p>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          <form className="space-y-4" onSubmit={submit} noValidate>
            <div className="grid gap-3 lg:grid-cols-2">
              <label className="fh-user-filter">
                Product name
                <input
                  value={draft.name}
                  onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="FaithHub Signature Hoodie"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
                {errors.name ? <span className="text-xs text-[#f77f00]">{errors.name}</span> : null}
              </label>

              <label className="fh-user-filter">
                Price
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={draft.price}
                  onChange={(event) => setDraft((prev) => ({ ...prev, price: event.target.value }))}
                  placeholder="39.99"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
                {errors.price ? <span className="text-xs text-[#f77f00]">{errors.price}</span> : null}
              </label>

              <label className="fh-user-filter">
                Category
                <select
                  value={draft.category}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, category: event.target.value as ProductCategory | "" }))
                  }
                  className="w-full"
                >
                  <option value="">Select category</option>
                  <option value="Books">Books</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
                {errors.category ? <span className="text-xs text-[#f77f00]">{errors.category}</span> : null}
              </label>

              <label className="fh-user-filter">
                Stock quantity
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={draft.stockQuantity}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, stockQuantity: event.target.value }))
                  }
                  placeholder="25"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
                {errors.stockQuantity ? (
                  <span className="text-xs text-[#f77f00]">{errors.stockQuantity}</span>
                ) : null}
              </label>

              <label className="fh-user-filter lg:col-span-2">
                Description
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, description: event.target.value }))
                  }
                  placeholder="Tell users what this product is, who it supports, and what makes it special."
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                />
                {errors.description ? (
                  <span className="text-xs text-[#f77f00]">{errors.description}</span>
                ) : null}
              </label>

              <label className="fh-user-filter lg:col-span-2">
                Image upload (mock)
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[rgba(3,205,140,0.14)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[var(--accent)]"
                />
                <span className="text-xs text-[var(--text-secondary)]">
                  {draft.imageName ? `Selected: ${draft.imageName}` : "No image selected"}
                </span>
                {errors.imageName ? (
                  <span className="text-xs text-[#f77f00]">{errors.imageName}</span>
                ) : null}
              </label>
            </div>

            {successMessage ? (
              <div className="rounded-xl border border-[rgba(3,205,140,0.34)] bg-[rgba(3,205,140,0.12)] px-3 py-2 text-sm text-[var(--text-primary)]">
                {successMessage}
              </div>
            ) : null}

            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="fh-user-secondary-btn"
                onClick={() => {
                  setDraft(initialDraft);
                  setErrors({});
                  setSuccessMessage("");
                }}
              >
                Reset
              </Button>
              <Button type="submit" className="fh-user-primary-btn" disabled={!canSubmit}>
                Submit Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {products.length ? (
        <Card className="fh-surface-card rounded-2xl">
          <CardContent className="p-4 sm:p-5">
            <div className="mb-3 text-base font-semibold text-[var(--text-primary)]">
              Mock Saved Products
            </div>
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm"
                >
                  <div className="font-semibold text-[var(--text-primary)]">{product.name}</div>
                  <div className="text-[var(--text-secondary)]">
                    {product.category} • ${product.price.toFixed(2)} • Stock {product.stockQuantity}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

