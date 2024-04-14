class ChangeTableFeatureLatitude < ActiveRecord::Migration[7.1]
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
end
