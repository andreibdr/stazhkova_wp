import React from 'react';

interface MiamiSkylineDividerProps {
  fillColor?: string; // e.g. '#1f201d' for footer or '#f7fbfc' for light section
  className?: string;
  flip?: boolean;
}

/**
 * MiamiSkylineDivider
 * An elegant SVG silhouette depicting the South Florida waterfront skyline:
 * luxury Sunny Isles / Miami towers, waterfront terraces, palm trees, and gentle bay ripples.
 */
export default function MiamiSkylineDivider({
  fillColor = '#1f201d',
  className = '',
  flip = false,
}: MiamiSkylineDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-14 sm:h-20 md:h-24 lg:h-28 block"
      >
        {/* Layer 1: Distant soft silhouettes (depth / skyline background) */}
        <path
          d="
            M0,110 L0,78
            L45,78 L45,62 L75,62 L75,78
            L140,78 L140,54 L170,54 L170,44 L195,44 L195,54 L210,54 L210,78
            L310,78 L310,48 L345,48 L345,36 L360,36 L360,48 L380,48 L380,78
            L480,78 L480,58 L520,58 L520,78
            L620,78 L620,40 L650,40 L650,28 L665,28 L665,40 L690,40 L690,78
            L780,78 L780,52 L810,52 L810,78
            L910,78 L910,42 L945,42 L945,30 L960,30 L960,42 L980,42 L980,78
            L1080,78 L1080,60 L1120,60 L1120,78
            L1220,78 L1220,46 L1250,46 L1250,34 L1270,34 L1270,46 L1295,46 L1295,78
            L1380,78 L1380,64 L1410,64 L1410,78
            L1440,78 L1440,110 Z
          "
          fill={fillColor}
          fillOpacity="0.35"
        />

        {/* Layer 2: Main Foreground Luxury Towers + Palm Trees + Terraces */}
        <path
          d="
            M0,110 L0,84
            /* Left shoreline wave */
            C30,83 60,85 90,84
            /* Tower 1 (Boutique Mid-rise) */
            L100,84 L100,52 L106,52 L106,44 L134,44 L134,52 L140,52 L140,84
            L155,84
            /* Palm 1 (Left cluster) */
            C158,82 161,75 163,65 C164,60 168,54 172,50
            C168,50 162,49 157,51 C161,48 167,46 173,47
            C172,43 175,38 180,36 C178,39 177,44 178,47
            C183,43 189,42 195,45 C190,48 185,49 181,50
            C185,53 187,58 187,63 C184,59 180,56 177,54
            C174,62 170,74 172,84
            L188,84
            /* Tower 2 (High-Rise Luxury Tower Sunny Isles style) */
            L220,84 L220,32 L225,32 L225,24 L232,24 L232,16 L234,16 L234,8 L236,16 L238,24 L255,24 L255,32 L260,32 L260,84
            /* Stepped terrace */
            L275,84 L275,60 L295,60 L295,84
            /* Tower 3 (Modern Slanted Roof Condo) */
            L325,84 L325,40 L350,22 L375,40 L375,84
            /* Palm 2 (Mid-left cluster) */
            L390,84
            C393,80 395,73 398,64 C400,60 404,55 408,52
            C404,52 398,51 393,53 C397,50 403,48 409,49
            C408,45 411,40 416,38 C414,41 413,46 414,49
            C419,45 425,44 431,47 C426,50 421,51 417,52
            C421,55 423,60 423,65 C420,61 416,58 413,56
            C410,64 406,75 408,84
            /* Low-rise marina / villa with boat mast */
            L435,84 L435,70 L448,70 L448,42 L450,42 L450,70 L465,70 L465,84
            L490,84
            /* Tower 4 (Curved Twin Tower Centerpiece) */
            L540,84 L540,30 L546,30 L546,20 L574,20 L574,30 L580,30 L580,84
            L595,84 L595,24 L601,24 L601,14 L629,14 L629,24 L635,24 L635,84
            /* Center waterfront park with dual palms */
            L650,84
            C653,79 656,71 659,61 C661,56 666,51 671,48
            C666,48 659,47 653,50 C658,46 665,44 672,45
            C671,41 674,35 680,33 C678,37 677,42 678,45
            C684,41 691,40 698,43 C692,46 686,47 681,49
            C686,52 688,58 688,63 C684,59 680,56 676,53
            C673,62 668,74 670,84
            L685,84
            C688,81 692,75 695,67 C698,62 703,58 709,55
            C703,55 696,54 690,57 C695,53 703,51 710,52
            C709,47 713,42 719,40 C717,44 715,49 717,52
            C723,48 730,47 737,50 C731,53 725,54 719,56
            C724,59 726,65 726,70 C722,66 718,63 714,60
            C711,68 706,77 708,84
            /* Tower 5 (Modern Grand Spire Tower) */
            L750,84 L750,36 L755,36 L755,26 L765,26 L765,12 L767,12 L767,4 L769,12 L771,26 L781,26 L781,36 L786,36 L786,84
            /* Mid-rise terraces */
            L810,84 L810,56 L830,56 L830,84
            /* Tower 6 (Glass Geometric Tower) */
            L860,84 L860,42 L870,32 L895,32 L905,42 L905,84
            /* Right palm cluster */
            L925,84
            C928,80 931,73 933,63 C935,58 940,53 945,49
            C940,49 933,48 927,51 C932,47 939,45 946,46
            C945,42 948,36 954,34 C952,38 951,43 952,46
            C958,42 965,41 972,44 C966,47 960,48 955,50
            C960,53 962,59 962,64 C958,60 954,57 950,54
            C947,63 942,75 944,84
            /* Tower 7 (Sunny Isles High-Rise) */
            L995,84 L995,28 L1002,28 L1002,18 L1028,18 L1028,28 L1035,28 L1035,84
            /* Terraced Residences */
            L1055,84 L1055,62 L1075,62 L1075,84
            /* Tower 8 (Crown Penthouse Tower) */
            L1110,84 L1110,38 L1120,28 L1140,28 L1150,38 L1150,84
            /* Far Right Palm */
            L1170,84
            C1173,80 1176,73 1178,64 C1180,59 1185,54 1190,51
            C1185,51 1178,50 1172,52 C1177,49 1184,47 1191,48
            C1190,44 1193,38 1199,36 C1197,40 1196,45 1197,48
            C1203,44 1210,43 1217,46 C1211,49 1205,50 1200,52
            C1205,55 1207,61 1207,66 C1203,62 1199,59 1195,56
            C1192,65 1187,76 1189,84
            /* Tower 9 (Modern stepped waterfront building) */
            L1230,84 L1230,50 L1245,50 L1245,36 L1275,36 L1275,50 L1290,50 L1290,84
            /* Right shoreline low-rises */
            L1320,84 L1320,66 L1345,66 L1345,84
            L1375,84 L1375,58 L1405,58 L1405,84
            /* Right shoreline wave */
            C1415,84 1428,85 1440,84
            /* Close base path */
            L1440,110 L0,110 Z
          "
          fill={fillColor}
        />

        {/* Layer 3: Delicate Water Ripple / Coastal Wave at base */}
        <path
          d="
            M0,110 L0,94
            C120,90 240,98 360,93
            C480,88 600,97 720,92
            C840,87 960,96 1080,91
            C1200,86 1320,95 1440,92
            L1440,110 Z
          "
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
