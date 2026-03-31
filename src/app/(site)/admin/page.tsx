'use client';

import React, { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  Truck,
  ArrowRightLeft,
  Trash2,
  Camera,
  CheckCircle,
  X,
} from 'lucide-react';
import { MOCK_SLOTS } from '@/data/mockData';
import { Slot, VehicleStatus } from '@/types';
import { StatusPill } from '@/components/ui/StatusPill';
import { UpdatedAt } from '@/components/ui/UpdatedAt';

type ModalType = 'assign' | 'move' | 'remove' | 'photo' | null;
interface ModalState {
  type: ModalType;
  slot: Slot | null;
}

export default function AdminPage() {
  const [modal, setModal] = useState<ModalState>({ type: null, slot: null });
  const [toast, setToast] = useState<string | null>(null);

  const openModal = (type: ModalType, slot: Slot) => {
    setModal({ type, slot });
  };

  const closeModal = () => {
    setModal({ type: null, slot: null });
  };

  const handleConfirm = (action: string) => {
    closeModal();
    setToast(`Demo: "${action}" action noted. Connect your API to enable real changes.`);
    setTimeout(() => setToast(null), 4000);
  };

  const slots = MOCK_SLOTS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-3 bg-slate-800 text-white text-sm font-medium px-5 py-3.5 rounded-xl shadow-xl max-w-sm">
          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 bg-slate-800 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Admin Panel
            </h1>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
              DEMO
            </span>
          </div>

          {/* Demo banner */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-semibold text-sm mb-0.5">
                Demo Mode — Read Only
              </p>
              <p className="text-amber-600 text-xs">
                This is a frontend demo. All actions will show confirmation
                dialogs but will not modify data. Connect your API endpoints in{' '}
                <code className="font-mono bg-amber-100 px-1 rounded">
                  src/lib/api.ts
                </code>{' '}
                to enable real changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Slots', value: slots.length },
            {
              label: 'Occupied',
              value: slots.filter((s) => s.status === 'occupied').length,
            },
            {
              label: 'Free Slots',
              value: slots.filter((s) => s.status === 'free').length,
            },
            {
              label: 'Vehicles',
              value: slots.filter((s) => s.currentVehicle !== null).length,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm"
            >
              <p className="text-2xl font-black text-slate-900 mb-0.5">
                {stat.value}
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Slots table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">All Slots</h2>
            <span className="text-xs text-slate-400">
              {slots.length} total slots
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Slot
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Current Vehicle
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Lot #
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    V-Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {slots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-slate-50 transition-colors">
                    {/* Slot code */}
                    <td className="px-5 py-4">
                      <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg">
                        {slot.slotCode}
                      </span>
                    </td>

                    {/* Slot status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          slot.status === 'occupied'
                            ? 'bg-amber-100 text-amber-700'
                            : slot.status === 'free'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            slot.status === 'occupied'
                              ? 'bg-amber-500'
                              : slot.status === 'free'
                              ? 'bg-emerald-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {slot.status.charAt(0).toUpperCase() +
                          slot.status.slice(1)}
                      </span>
                    </td>

                    {/* Vehicle */}
                    <td className="px-5 py-4">
                      {slot.currentVehicle ? (
                        <div>
                          <p className="font-semibold text-slate-800">
                            {slot.currentVehicle.year}{' '}
                            {slot.currentVehicle.make}{' '}
                            {slot.currentVehicle.model}
                          </p>
                          {slot.currentVehicle.trim && (
                            <p className="text-xs text-slate-400">
                              {slot.currentVehicle.trim}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">
                          — Empty —
                        </span>
                      )}
                    </td>

                    {/* Lot # */}
                    <td className="px-5 py-4">
                      {slot.currentVehicle ? (
                        <span className="font-mono text-xs bg-slate-100 border border-slate-200 text-slate-600 px-2 py-1 rounded">
                          {slot.currentVehicle.lotNumber}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Vehicle status */}
                    <td className="px-5 py-4">
                      {slot.currentVehicle ? (
                        <StatusPill status={slot.currentVehicle.status} size="sm" />
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Updated */}
                    <td className="px-5 py-4">
                      {slot.currentVehicle ? (
                        <UpdatedAt isoString={slot.currentVehicle.updatedAt} />
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {!slot.currentVehicle && (
                          <button
                            onClick={() => openModal('assign', slot)}
                            className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <Truck className="w-3 h-3" />
                            Assign
                          </button>
                        )}
                        {slot.currentVehicle && (
                          <>
                            <button
                              onClick={() => openModal('photo', slot)}
                              className="inline-flex items-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <Camera className="w-3 h-3" />
                              Photo
                            </button>
                            <button
                              onClick={() => openModal('move', slot)}
                              className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <ArrowRightLeft className="w-3 h-3" />
                              Move
                            </button>
                            <button
                              onClick={() => openModal('remove', slot)}
                              className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {modal.type && modal.slot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {modal.type === 'assign' && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Truck className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Assign Vehicle
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  Assigning a vehicle to slot{' '}
                  <strong className="text-amber-600">{modal.slot.slotCode}</strong>.
                  In production, this would open a vehicle selector.
                </p>
                <div className="bg-slate-50 rounded-xl p-3 mb-5 text-xs font-mono text-slate-500">
                  POST /api/slots/{modal.slot.slotCode}/assign
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() =>
                      handleConfirm(`Assign vehicle to ${modal.slot!.slotCode}`)
                    }
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Confirm (Demo)
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {modal.type === 'move' && modal.slot.currentVehicle && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Move Vehicle
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-2">
                  Moving{' '}
                  <strong className="text-slate-800">
                    {modal.slot.currentVehicle.year}{' '}
                    {modal.slot.currentVehicle.make}{' '}
                    {modal.slot.currentVehicle.model}
                  </strong>{' '}
                  from slot{' '}
                  <strong className="text-amber-600">
                    {modal.slot.slotCode}
                  </strong>
                  .
                </p>
                <p className="text-slate-400 text-xs mb-4">
                  In production, this would show available slots for selection.
                </p>
                <div className="bg-slate-50 rounded-xl p-3 mb-5 text-xs font-mono text-slate-500">
                  PATCH /api/vehicles/{modal.slot.currentVehicle.id}/slot
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() =>
                      handleConfirm(
                        `Move ${modal.slot!.currentVehicle!.lotNumber}`
                      )
                    }
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Confirm (Demo)
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {modal.type === 'remove' && modal.slot.currentVehicle && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Mark as Removed
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-2">
                  Mark{' '}
                  <strong className="text-slate-800">
                    {modal.slot.currentVehicle.lotNumber}
                  </strong>{' '}
                  as removed and free up slot{' '}
                  <strong className="text-amber-600">
                    {modal.slot.slotCode}
                  </strong>
                  ?
                </p>
                <p className="text-slate-400 text-xs mb-4">
                  This would set vehicle status to &quot;removed&quot; and clear the slot.
                </p>
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 text-xs text-red-600">
                  Warning: This action cannot be undone without manual reassignment.
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() =>
                      handleConfirm(
                        `Mark ${modal.slot!.currentVehicle!.lotNumber} removed`
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Mark Removed (Demo)
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {modal.type === 'photo' && modal.slot.currentVehicle && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
                    <Camera className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Upload Photo
                  </h3>
                </div>
                <p className="text-slate-500 text-sm mb-4">
                  Upload a new photo for{' '}
                  <strong className="text-slate-800">
                    {modal.slot.currentVehicle.year}{' '}
                    {modal.slot.currentVehicle.make}{' '}
                    {modal.slot.currentVehicle.model}
                  </strong>{' '}
                  ({modal.slot.currentVehicle.lotNumber}).
                </p>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center mb-5 hover:border-amber-400 transition-colors cursor-pointer bg-slate-50">
                  <Camera className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-400 text-sm">
                    Click to select photo (Demo)
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    JPG, PNG up to 10MB
                  </p>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={() =>
                      handleConfirm(
                        `Upload photo for ${modal.slot!.currentVehicle!.lotNumber}`
                      )
                    }
                    className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Upload (Demo)
                  </button>
                  <button
                    onClick={closeModal}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
