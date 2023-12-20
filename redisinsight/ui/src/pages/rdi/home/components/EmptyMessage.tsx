import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiLink, EuiSpacer, EuiText } from '@elastic/eui'
import React from 'react'

import EmptyListIcon from 'uiSrc/assets/img/rdi/empty_list.svg'
import NewTabIcon from 'uiSrc/assets/img/rdi/new_tab.svg'

import styles from './styles.module.scss'

export interface Props {
  onAddInstanceClick: () => void
}

const EmptyMessage = ({ onAddInstanceClick }: Props) => (
  <div className={styles.noResultsContainer} data-testid="empty-rdi-instance-list">
    <EuiImage src={EmptyListIcon} alt="empty" size="m" />
    <EuiSpacer size="xl" />
    <EuiText>No deployments found</EuiText>
    <EuiText className={styles.subTitle}>Add your first deployment to get started!</EuiText>
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>
        <EuiButton color="secondary" fill size="s" onClick={onAddInstanceClick}>
          + RDI Instance
        </EuiButton>
      </EuiFlexItem>
      or
      <EuiFlexItem>
        <EuiLink
          target="_blank"
          external={false}
          href="https://docs.redis.com/rdi-preview/rdi/quickstart/"
        >
          RDI Quickstart <EuiIcon type={NewTabIcon} />
        </EuiLink>
      </EuiFlexItem>
    </EuiFlexGroup>
  </div>
)

export default EmptyMessage
