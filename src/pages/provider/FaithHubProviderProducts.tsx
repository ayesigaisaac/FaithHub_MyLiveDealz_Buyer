import React, { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProviderProduct = {
  id: string;
  name: string;
  price: number;
  stock: number;
  providerId: string;
  providerName: string;
};

const seedProducts: ProviderProduct[] = [
  {
    id: "prod-1",
    name: "Faith in Action Devotional",
    price: 18.99,
    stock: 27,
    providerId: "provider-1",
    providerName: "FaithHub Provider Workspace",
  },
  {
    id: "prod-2",
    name: "FaithHub Signature Hoodie",
    price: 39.0,
    stock: 4,
    providerId: "provider-1",
    providerName: "FaithHub Provider Workspace",
  },
  {
    id: "prod-3",
    name: "Prayer Journal Tote Bag",
    price: 16.4,
    stock: 14,
    providerId: "provider-2",
    providerName: "New Life Outreach",
  },
];

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function FaithHubProviderProducts() {
  const currentProvider = {
    id: "provider-1",
    name: "FaithHub Provider Workspace",
  };

  const [products, setProducts] = useState<ProviderProduct[]>(seedProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{ name: string; price: string; stock: string }>({
    name: "",
    price: "",
    stock: "",
  });

  const providerProducts = useMemo(
    () => products.filter((product) => product.providerId === currentProvider.id),
    [products, currentProvider.id],
  );

  const inventoryValue = useMemo(
    () =>
      providerProducts.reduce((sum, product) => sum + product.price * product.stock, 0),
    [providerProducts],
  );

  const startEdit = (product: ProviderProduct) => {
    setEditingId(product.id);
    setEditDraft({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ name: "", price: "", stock: "" });
  };

  const saveEdit = (id: string) => {
    const price = Number(editDraft.price);
    const stock = Number(editDraft.stock);
    if (!editDraft.name.trim() || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
      return;
    }

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              name: editDraft.name.trim(),
              price,
              stock,
            }
          : product,
      ),
    );
    cancelEdit();
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    if (editingId === id) cancelEdit();
  };

  return (
    <div className="space-y-4">
      <Card className="fh-surface-card rounded-[28px]">
        <CardContent className="p-5 sm:p-6">
          <div className="fh-label text-[var(--text-muted)]">Provider Merchandise</div>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Product Management
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Manage your merchandise catalog, update pricing, and keep stock levels current.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
            <span>Provider: {currentProvider.name}</span>
            <span>
              {providerProducts.length} product{providerProducts.length === 1 ? "" : "s"}
            </span>
            <span>Inventory value {currency(inventoryValue)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="fh-surface-card rounded-2xl">
        <CardContent className="p-4 sm:p-5">
          {providerProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-8 text-center text-sm text-[var(--text-secondary)]">
              No products available for this provider.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {providerProducts.map((product) => {
                const isEditing = editingId === product.id;
                return (
                  <div
                    key={product.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4"
                  >
                    {isEditing ? (
                      <div className="grid gap-2">
                        <input
                          value={editDraft.name}
                          onChange={(event) =>
                            setEditDraft((prev) => ({ ...prev, name: event.target.value }))
                          }
                          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                          placeholder="Product name"
                        />
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={editDraft.price}
                          onChange={(event) =>
                            setEditDraft((prev) => ({ ...prev, price: event.target.value }))
                          }
                          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                          placeholder="Price"
                        />
                        <input
                          type="number"
                          min={0}
                          step={1}
                          value={editDraft.stock}
                          onChange={(event) =>
                            setEditDraft((prev) => ({ ...prev, stock: event.target.value }))
                          }
                          className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                          placeholder="Stock"
                        />
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" className="fh-user-secondary-btn" onClick={cancelEdit}>
                            Cancel
                          </Button>
                          <Button className="fh-user-primary-btn" onClick={() => saveEdit(product.id)}>
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col gap-3">
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="truncate text-base font-semibold text-[var(--text-primary)]">
                            {product.name}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                            <span>Price: {currency(product.price)}</span>
                            <span>Stock: {product.stock}</span>
                          </div>
                        </div>

                        <div className="mt-auto flex items-center gap-2">
                          <Button
                            variant="outline"
                            className="fh-user-secondary-btn"
                            onClick={() => startEdit(product)}
                          >
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            className="h-[42px] rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => deleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
