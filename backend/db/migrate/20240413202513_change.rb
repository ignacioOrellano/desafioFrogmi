class Change < ActiveRecord::Migration[7.1]
  def up
    change_table :features do |t|
      t.change :c_latitude, :decimal
    end
  end

  def down
    change_table :features do |t|
      t.change :c_latitude, :string
    end
  end

  def change
    remove_column :features, :decimal, :string
  end
end
