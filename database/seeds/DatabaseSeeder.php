<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // $this->call(UserTableSeeder::class);

        // App\User::create([
        //     'name'=>'tester',
        //     'email'=>'test@example.com',
        //     'password'=>bcrypt('secret')
        // ]);

        $severities = [
            [
                'rating' => 1,
                'description' => 'easy walk',
            ],
            [
                'rating' => 2,
                'description' => 'moderate walk',
            ],
            [
                'rating' => 3,
                'description' => 'strenuous walk',
            ],
            [
                'rating' => 4,
                'description' => 'very strenuous walk',
            ]
        ];

        $exposures = [
            [
                'rating' => '1',
                'description' => 'no exposure to heights',
            ],
            [
                'rating' => '2',
                'description' => 'mild exposure to heights',
            ],
            [
                'rating' => '3',
                'description' => 'moderate exposure to heights',
            ],
            [
                'rating' => '4',
                'description' => 'extreme exposure to heights',
            ]
        ];

        DB::table('severities')->delete();
        foreach ($severities as $severity) {
            DB::table('severities')->insert($severity);
        }

        DB::table('exposures')->delete();
        foreach ($exposures as $exposure) {
            DB::table('exposures')->insert($exposure);
        }

        if (!$severities = DB::table('severities')->select('id')->get()) {
            exit('There are no severities in the db.');
        }

        if (!$exposures = DB::table('exposures')->select('id')->get()) {
            exit('There are no exposures in the db.');
        }

        $severity_ids = [];
        foreach ($severities as $s) {
            $severity_ids[] = $s->id;
        }

        $exposure_ids = [];
        foreach ($exposures as $e) {
            $exposure_ids[] = $e->id;
        }

        $trails = [
            [
                'name' => 'Skeleton Gorge',
                'description' => 'strenuous shady trail, that leads to a dam',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2015-01-09 22:14:06',
            ],
            [
                'name' => 'Contour Path',
                'description' => 'very long level path that goes almost around the table mountain.',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2016-07-10 10:16:11',
            ],
            [
                'name' => 'Pipe Track',
                'description' => 'easy trail with historical water pipes.',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2015-01-06 13:04:06',
            ],
            [
                'name' => 'platteklip gorge',
                'description' => 'steep trail up the face of table mountain.',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2016-02-28 16:10:06',
            ],
            [
                'name' => 'kasteels poort',
                'description' => 'goes from the pipe track up to the twelve apostles',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'table mountain road',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'tokai forest',
                'description' => 'walk under the trees',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'muizenberg peak',
                'description' => 'ajofda owerij pasofk ewfjolefakfdj oa fej, asldfj',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2015-05-22 19:01:38',
            ],
            [
                'name' => 'sIlvermines',
                'description' => 'o accessused t  plowerf the mountain by carts oar',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'newlands Ravine',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2014-12-31 23:59:59',
            ],
            [
                'name' => 'the saddle',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2015-06-10 00:14:06',
            ],
            [
                'name' => 'cable car',
                'description' => 'fsadofewm fpaofk epwfkpwef  faehg kuylo ',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'hely hutchinson dam',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
            [
                'name' => 'old dogs trail',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2016-10-16 15:14:06',
            ],
            [
                'name' => '1234 32432 afasdfsa',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
                'created_at' => '2015-08-19 22:14:06',
            ],
            [
                'name' => 'pfasdf 99',
                'description' => 'used to access lower parts of the mountain by car',
                'severity_id' => $severity_ids[rand(0, 3)],
                'exposure_id' => $exposure_ids[rand(0, 3)],
            ],
        ];

        DB::table('trails')->delete();
        foreach ($trails as $trail) {
            DB::table('trails')->insert($trail);
        }

        $trails = DB::table('trails')->select('id')->get();

        $trail_ids = [];
        foreach ($trails as $trail) {
            $trail_ids[] = $trail->id;
        }

        $count = count($trail_ids);

        $hikes = [
            [
                'title' => 'newlands forest to the blockhouse',
                'description' => 'Hike from newlands forest to the King\'s Blockhouse.',
                'severity_id' => $severity_ids[rand(0,3)],
                'exposure_id' => $exposure_ids[rand(0,3)],
                'slug' => str_slug('newlands forest to the blockhouse'),
            ],
            [
                'title' => 'cecilia forest to hely hutchinson dam via skeleton gorge',
                'description' => 'A steep climb up skeleton gorge to hely hutchinson dam and back down via nursery ravine',
                'severity_id' => $severity_ids[rand(0,3)],
                'exposure_id' => $exposure_ids[rand(0,3)],
                'slug' => str_slug('cecilia forest to hely hutchinson dam via skeleton gorge'),
            ],
            [
                'title' => 'Rhodes Memorial to Woodstock Cave',
                'description' => 'A nice hike from Rhodes Mem to Woodstock Cave.',
                'severity_id' => $severity_ids[rand(0,3)],
                'exposure_id' => $exposure_ids[rand(0,3)],
                'slug' => str_slug('Rhodes Memorial to Woodstock Cave'),
            ],
            [
                'title' => 'Twelve Apostles',
                'description' => 'A very long hike.',
                'severity_id' => $severity_ids[rand(0,3)],
                'exposure_id' => $exposure_ids[rand(0,3)],
                'slug' => str_slug('Twelve Apostles'),
            ],
        ];

        DB::table('hikes')->delete();
        DB::table('hike_trail')->delete();
        foreach ($hikes as $hike) {
            $id = DB::table('hikes')->insertGetId($hike);
            $number_of_trails_to_add = rand(0, $count);

            $i = 0;
            $used_trail_ids = [];
            while($number_of_trails_to_add >= $i) {

                while(in_array($trail_id = rand(0, ($count - 1)), $used_trail_ids)) {
                    continue;
                }

                $used_trail_ids[] = $trail_id;
                $hike_trail = [
                    'hike_id' => $id,
                    'trail_id' => $trail_ids[$trail_id],
                ];
                DB::table('hike_trail')->insert($hike_trail);
                $i++;
            }

        }


    }
}
