const categoryMapping = {
  machine_roller: 'Roller Machines',
  machine_sorter: 'Sorter Machines',
  machine_dryer: 'Dryer Machines',
  machine_die_casting: 'Die Casting Machines',
}

export function getCategoryDisplayName(category) {
  return categoryMapping[category] || category;
}