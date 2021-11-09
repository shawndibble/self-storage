<?php

namespace App\Http\Repositories;

use App\Models\StorageUnit;

class StorageUnitRepository
{
    public function selectIndex()
    {
        return StorageUnit::with('user:id,name')
            ->select('id', 'name', 'user_id')
            ->get()
            ->map(function ($record) {
                $assignment = $record->user->id ? " (assigned to {$record->user->name})" : "";
                return [
                    'id' => $record->id,
                    'label' => "Unit {$record->name}{$assignment}"];
            });
    }
}
