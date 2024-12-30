import { Tree, TreeNode } from 'react-organizational-chart';
import { UserIcon } from '@heroicons/react/24/outline';
import { useOrganization } from '../context/OrganizationContext';

const StyledNode = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 rounded-lg border-2 border-blue-200 shadow-md bg-white min-w-[200px]">
    {children}
  </div>
);

const PersonCard = ({ name, title, department }: { name: string; title: string; department?: string }) => (
  <div className="text-center">
    <div className="flex justify-center mb-2">
      <UserIcon className="h-12 w-12 text-blue-600" />
    </div>
    <h3 className="font-semibold text-gray-900">{name}</h3>
    <p className="text-sm text-gray-600">{title}</p>
    {department && <p className="text-xs text-gray-500">{department}</p>}
  </div>
);

interface Position {
  id: number;
  name: string;
  title: string;
  department: string;
  level: number;
  parentId: number | null;
}

function buildOrganizationTree(positions: Position[], parentId: number | null = null): Position[] {
  return positions
    .filter(position => position.parentId === parentId)
    .map(position => ({
      ...position,
      children: buildOrganizationTree(positions, position.id)
    }));
}

function renderOrganizationTree(node: any) {
  return (
    <TreeNode
      key={node.id}
      label={
        <StyledNode>
          <PersonCard
            name={node.name}
            title={node.title}
            department={node.department}
          />
        </StyledNode>
      }
    >
      {node.children?.map((child: any) => renderOrganizationTree(child))}
    </TreeNode>
  );
}

export default function Organization() {
  const { positions } = useOrganization();
  const organizationTree = buildOrganizationTree(positions);
  const rootNode = organizationTree[0]; // Assuming the first node is the root

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Organizasyon Şeması</h1>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Devlet Su İşleri Genel Müdürlüğü Teşkilat Yapısı
          </p>
        </div>

        <div className="overflow-auto pb-12">
          <div className="inline-block min-w-full">
            {rootNode && (
              <Tree
                lineWidth={'2px'}
                lineColor={'#93c5fd'}
                lineBorderRadius={'10px'}
                label={
                  <StyledNode>
                    <PersonCard
                      name={rootNode.name}
                      title={rootNode.title}
                      department={rootNode.department}
                    />
                  </StyledNode>
                }
              >
                {rootNode.children?.map((child: any) => renderOrganizationTree(child))}
              </Tree>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Teşkilat Yapısı Hakkında</h2>
          <div className="prose prose-blue max-w-none">
            <p>
              Devlet Su İşleri Genel Müdürlüğü, su kaynaklarının planlanması, yönetimi, geliştirilmesi ve işletilmesi 
              görevlerini yerine getiren bir kamu kuruluşudur. Teşkilat yapımız, bu görevleri en etkin şekilde yerine 
              getirmek üzere tasarlanmıştır.
            </p>
            <h3>Temel Birimlerimiz:</h3>
            <ul>
              <li>Barajlar ve HES Dairesi Başkanlığı</li>
              <li>İçmesuyu Dairesi Başkanlığı</li>
              <li>Proje Dairesi Başkanlığı</li>
              <li>İnşaat Dairesi Başkanlığı</li>
              <li>Strateji Geliştirme Dairesi Başkanlığı</li>
              <li>İnsan Kaynakları Dairesi Başkanlığı</li>
            </ul>
            <p>
              Her birim, kendi alanında uzman personel ile çalışmakta ve kurumumuzun misyon ve vizyonu doğrultusunda 
              faaliyetlerini sürdürmektedir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
