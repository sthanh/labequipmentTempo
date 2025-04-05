import React, { useState } from 'react';
import { ArrowLeftIcon, SaveIcon, PlusIcon, XIcon, ImageIcon } from 'lucide-react';
export function AddEquipmentPage({
  onBack,
  onSave
}) {
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    type: '',
    model: '',
    manufacturer: '',
    serialNumber: '',
    location: '',
    installDate: '',
    warrantyExpiration: '',
    maintenanceInterval: '',
    description: '',
    documents: []
  });
  const handleSubmit = e => {
    e.preventDefault();
    onSave(formData);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="mr-4 p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Add New Equipment
          </h1>
        </div>
        <button onClick={handleSubmit} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <SaveIcon size={16} className="mr-2" />
          Save Equipment
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Equipment Name*
              </label>
              <input type="text" required value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Equipment ID*
              </label>
              <input type="text" required value={formData.id} onChange={e => setFormData({
              ...formData,
              id: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category/Type*
              </label>
              <select required value={formData.type} onChange={e => setFormData({
              ...formData,
              type: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a category</option>
                <option value="Analytical">Analytical</option>
                <option value="PCR">PCR</option>
                <option value="Imaging">Imaging</option>
                <option value="Sample Prep">Sample Prep</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location*
              </label>
              <select required value={formData.location} onChange={e => setFormData({
              ...formData,
              location: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a location</option>
                <option value="Main Lab">Main Lab</option>
                <option value="Imaging Suite">Imaging Suite</option>
                <option value="Molecular Lab">Molecular Lab</option>
                <option value="Prep Room">Prep Room</option>
              </select>
            </div>
          </div>
        </div>
        {/* Technical Details */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Technical Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input type="text" value={formData.model} onChange={e => setFormData({
              ...formData,
              model: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <input type="text" value={formData.manufacturer} onChange={e => setFormData({
              ...formData,
              manufacturer: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Serial Number
              </label>
              <input type="text" value={formData.serialNumber} onChange={e => setFormData({
              ...formData,
              serialNumber: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Installation Date
              </label>
              <input type="date" value={formData.installDate} onChange={e => setFormData({
              ...formData,
              installDate: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
        {/* Maintenance Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Maintenance Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Warranty Expiration
              </label>
              <input type="date" value={formData.warrantyExpiration} onChange={e => setFormData({
              ...formData,
              warrantyExpiration: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maintenance Interval (days)
              </label>
              <input type="number" value={formData.maintenanceInterval} onChange={e => setFormData({
              ...formData,
              maintenanceInterval: e.target.value
            })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>
        {/* Description and Notes */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Description and Notes
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea rows={4} value={formData.description} onChange={e => setFormData({
            ...formData,
            description: e.target.value
          })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        {/* Documents and Attachments */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Documents and Attachments
          </h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                <div className="mt-4 flex text-sm justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                  </label>
                  <p className="pl-1 text-gray-500">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, XLS up to 10MB each
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>;
}