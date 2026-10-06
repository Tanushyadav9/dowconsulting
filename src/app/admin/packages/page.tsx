"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";

interface ConsultingPackage {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  priceINR: number;
  priceUSD: number;
  inclusions: string[];
  isPopular: boolean;
  isActive: boolean;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<ConsultingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Edit / Create modal state
  const [editingPkg, setEditingPkg] = useState<ConsultingPackage | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [inclusionsText, setInclusionsText] = useState("");

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load packages");
      setPackages(data.packages || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleTogglePublish = async (pkg: ConsultingPackage) => {
    setError(null);
    setSuccess(null);
    try {
      const newStatus = !pkg.isActive;
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pkg.id, isActive: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update package status");

      setPackages((prev) =>
        prev.map((p) => (p.id === pkg.id ? { ...p, isActive: newStatus } : p))
      );
      setSuccess(`Package "${pkg.name}" is now ${newStatus ? "PUBLISHED (Live on site)" : "UNPUBLISHED (Draft only, checkout blocked)"}.`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEdit = (pkg: ConsultingPackage) => {
    setEditingPkg(pkg);
    setIsNew(false);
    setInclusionsText(pkg.inclusions.join("\n"));
  };

  const startNew = () => {
    setEditingPkg({
      id: "",
      slug: "",
      name: "",
      subtitle: "",
      priceINR: 35000,
      priceUSD: 499,
      inclusions: [],
      isPopular: false,
      isActive: false, // Default unpublished
    });
    setIsNew(true);
    setInclusionsText("");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;
    setError(null);
    setSuccess(null);

    const inclusionsArray = inclusionsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (isNew) {
        const res = await fetch("/api/admin/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editingPkg,
            inclusions: inclusionsArray,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create package");
        setSuccess(`Created package "${data.package.name}".`);
      } else {
        const res = await fetch("/api/admin/packages", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingPkg.id,
            name: editingPkg.name,
            subtitle: editingPkg.subtitle,
            priceINR: Number(editingPkg.priceINR),
            priceUSD: Number(editingPkg.priceUSD),
            inclusions: inclusionsArray,
            isPopular: editingPkg.isPopular,
            isActive: editingPkg.isActive,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update package");
        setSuccess(`Updated package "${data.package.name}".`);
      }

      setEditingPkg(null);
      fetchPackages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const publishedCount = packages.filter((p) => p.isActive).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-[#C9A24B] uppercase tracking-wider">
            Pricing &amp; Scope Architecture
          </span>
          <h1 className="text-2xl font-bold text-[#1B2838]">Advisory Packages &amp; Pricing</h1>
          <p className="text-xs text-[#5A6472]">
            Data-driven control over public advisory packages. Only published packages show prices and allow direct checkout.
          </p>
        </div>

        <button
          onClick={startNew}
          className="inline-flex items-center gap-2 bg-[#1B2838] hover:bg-[#2A3D54] text-[#F7F6F3] px-4 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C9A24B]" />
          <span>New Package</span>
        </button>
      </div>

      {/* Status Notice */}
      <div className="p-4 rounded border bg-[#F7F6F3] border-[#E2E8F0] text-xs text-[#5A6472] flex items-start gap-3">
        <Package className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-[#1B2838]">
            Current Publication State: {publishedCount} published package{publishedCount === 1 ? "" : "s"} live.
          </p>
          <p>
            {publishedCount === 0 ? (
              <span className="text-amber-700 font-medium">
                No packages are currently published. The public /packages page automatically displays the executive &quot;Request a Proposal&quot; flow with all direct pricing and checkout disabled.
              </span>
            ) : (
              <span>
                Published packages are visible to the public with verified fixed pricing and active Razorpay/Stripe checkout.
              </span>
            )}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Packages Table / Grid */}
      <div className="bg-[#FFFFFF] rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#5A6472]">Loading advisory packages...</div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-8 h-8 text-[#8C96A5] mx-auto" />
            <p className="text-xs text-[#5A6472]">No packages found in database.</p>
            <button
              onClick={startNew}
              className="text-xs text-[#C9A24B] font-bold hover:underline"
            >
              Create your first package
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E8F0]">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#F7F6F3]/50 transition-colors">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-sm text-[#1B2838]">{pkg.name}</h3>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        pkg.isActive
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {pkg.isActive ? "Published Live" : "Unpublished Draft"}
                    </span>
                    {pkg.isPopular && (
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    )}
                  </div>

                  {pkg.subtitle && <p className="text-xs text-[#5A6472]">{pkg.subtitle}</p>}

                  <div className="flex items-center gap-4 text-xs font-semibold text-[#1B2838] pt-1">
                    <span>₹{pkg.priceINR.toLocaleString("en-IN")} INR</span>
                    <span className="text-[#8C96A5]">•</span>
                    <span>${pkg.priceUSD} USD</span>
                    <span className="text-[#8C96A5]">•</span>
                    <span className="text-[#5A6472] font-normal">{pkg.inclusions.length} deliverables listed</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleTogglePublish(pkg)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded text-xs font-semibold transition-colors border ${
                      pkg.isActive
                        ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    {pkg.isActive ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Unpublish Draft</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish Live</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => startEdit(pkg)}
                    className="p-2 rounded text-[#5A6472] hover:text-[#1B2838] border border-[#E2E8F0] hover:bg-[#FFFFFF]"
                    title="Edit Package"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit / New Modal */}
      {editingPkg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
              <h3 className="font-bold text-base text-[#1B2838]">
                {isNew ? "Create Advisory Package" : `Edit "${editingPkg.name}"`}
              </h3>
              <button
                onClick={() => setEditingPkg(null)}
                className="p-1 rounded text-[#5A6472] hover:text-[#1B2838]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B2838]">Package Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.name}
                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1B2838]">Slug (URL Identifier) *</label>
                  <input
                    type="text"
                    required
                    value={editingPkg.slug}
                    onChange={(e) => setEditingPkg({ ...editingPkg, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}
                    placeholder="e.g. commercial-growth-tier"
                    className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Subtitle / Target Profile</label>
                <input
                  type="text"
                  value={editingPkg.subtitle || ""}
                  onChange={(e) => setEditingPkg({ ...editingPkg, subtitle: e.target.value })}
                  placeholder="e.g. Comprehensive spatial optimization & strategic timing"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1B2838]">Price in INR (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingPkg.priceINR}
                    onChange={(e) => setEditingPkg({ ...editingPkg, priceINR: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1B2838]">Price in USD ($) *</label>
                  <input
                    type="number"
                    required
                    value={editingPkg.priceUSD}
                    onChange={(e) => setEditingPkg({ ...editingPkg, priceUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1B2838]">Deliverable Inclusions (One per line)</label>
                <textarea
                  rows={5}
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                  placeholder="90-Minute Strategy Session&#10;Full Written PDF Blueprint&#10;Commercial Site Grid Analysis"
                  className="w-full px-3 py-2 rounded border border-[#E2E8F0]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isActive}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isActive: e.target.checked })}
                    className="rounded text-[#1B2838]"
                  />
                  <span className="font-semibold text-[#1B2838]">Publish Live on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPkg.isPopular}
                    onChange={(e) => setEditingPkg({ ...editingPkg, isPopular: e.target.checked })}
                    className="rounded text-[#1B2838]"
                  />
                  <span className="font-semibold text-[#1B2838]">Mark as Featured / Most Chosen</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="px-4 py-2 rounded text-xs font-semibold text-[#5A6472] border border-[#E2E8F0] hover:bg-[#F7F6F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-bold uppercase tracking-wider text-[#F7F6F3] bg-[#1B2838] hover:bg-[#2A3D54]"
                >
                  <Save className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Save Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
